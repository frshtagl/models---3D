#!/usr/bin/env python3
"""Optuna tuning for the embryonic venous centre-line renderer.

Authored anatomical control points are never moved. The optimiser selects
spline parameterisation and tessellation density by balancing path fidelity,
overshoot, curvature smoothness and browser geometry cost.
"""
from __future__ import annotations
import argparse, json, math, re
from pathlib import Path
import optuna

ROOT = Path(__file__).resolve().parents[1]
NETWORK_FILES = (
    "src/data/vitellineNetwork.ts", "src/data/hepaticVascularNetwork.ts",
    "src/data/intervitellineNetwork.ts", "src/data/portalNetwork.ts",
    "src/data/hepaticOutflowNetwork.ts", "src/data/umbilicalNetwork.ts",
    "src/data/cardinalNetwork.ts",
)
POINT_RE = re.compile(r"point\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)")

def distance(a, b): return math.sqrt(sum((x-y)**2 for x,y in zip(a,b)))
def add(a, b): return tuple(x+y for x,y in zip(a,b))
def sub(a, b): return tuple(x-y for x,y in zip(a,b))
def mul(a, s): return tuple(x*s for x in a)
def dot(a, b): return sum(x*y for x,y in zip(a,b))

def balanced(source, open_index, left, right):
    depth, quote, escaped = 0, None, False
    for index in range(open_index, len(source)):
        char = source[index]
        if quote:
            if escaped: escaped = False
            elif char == chr(92): escaped = True
            elif char == quote: quote = None
            continue
        if char in ("'", '"', chr(96)): quote = char
        elif char == left: depth += 1
        elif char == right:
            depth -= 1
            if depth == 0: return source[open_index:index+1]
    return ""

def extract_polylines():
    paths, seen = [], set()
    for relative in NETWORK_FILES:
        source = (ROOT / relative).read_text(encoding="utf-8")
        for match in re.finditer(r"\bpoints\s*:\s*\[", source):
            block = balanced(source, match.end()-1, "[", "]")
            points = [tuple(map(float, p)) for p in POINT_RE.findall(block)]
            if len(points) >= 2:
                prior = source[max(0, match.start()-500):match.start()]
                ids = re.findall(r"id\s*:\s*'([^']+)'", prior)
                path_id = ids[-1] if ids else f"{relative}:{match.start()}"
                signature = tuple(points)
                if signature not in seen:
                    paths.append({"id": path_id, "points": points, "source": relative})
                    seen.add(signature)

        if relative.endswith("intervitellineNetwork.ts"):
            for match in re.finditer(r"\banastomosis\(\s*'([^']+)'", source):
                block = balanced(source, source.index("(", match.start()), "(", ")")
                points = [tuple(map(float, p)) for p in POINT_RE.findall(block)]
                if len(points) >= 2:
                    signature = tuple(points)
                    if signature not in seen:
                        paths.append({"id": match.group(1), "points": points, "source": relative})
                        seen.add(signature)

        if relative.endswith("hepaticVascularNetwork.ts"):
            nodes = {}
            node_re = re.compile(r"id\s*:\s*'([^']+)'[\s\S]{0,260}?position\s*:\s*point\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)")
            for node in node_re.finditer(source):
                nodes[node.group(1)] = tuple(float(node.group(i)) for i in (2,3,4))
            path_re = re.compile(r"path\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'(?:\s*,\s*point\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\))?\s*\)")
            for item in path_re.finditer(source):
                start, end = item.group(2), item.group(3)
                if start not in nodes or end not in nodes: continue
                points = [nodes[start]]
                if item.group(4): points.append(tuple(float(item.group(i)) for i in (4,5,6)))
                points.append(nodes[end])
                signature = tuple(points)
                if signature not in seen:
                    paths.append({"id": item.group(1), "points": points, "source": relative})
                    seen.add(signature)
    return paths

def catmull_segment(p0,p1,p2,p3,t,alpha):
    t0=0.0; t1=t0+max(distance(p0,p1),1e-6)**alpha
    t2=t1+max(distance(p1,p2),1e-6)**alpha
    t3=t2+max(distance(p2,p3),1e-6)**alpha
    u=t1+(t2-t1)*t
    def blend(a,b,ta,tb):
        span=max(tb-ta,1e-9)
        return add(mul(a,(tb-u)/span),mul(b,(u-ta)/span))
    a1=blend(p0,p1,t0,t1); a2=blend(p1,p2,t1,t2); a3=blend(p2,p3,t2,t3)
    b1=add(mul(a1,(t2-u)/(t2-t0)),mul(a2,(u-t0)/(t2-t0)))
    b2=add(mul(a2,(t3-u)/(t3-t1)),mul(a3,(u-t1)/(t3-t1)))
    return add(mul(b1,(t2-u)/(t2-t1)),mul(b2,(u-t1)/(t2-t1)))

def sample_curve(points,alpha,subdivisions):
    out=[]
    for i in range(len(points)-1):
        p1,p2=points[i],points[i+1]
        p0=points[i-1] if i else add(p1,sub(p1,p2))
        p3=points[i+2] if i+2<len(points) else add(p2,sub(p2,p1))
        for j in range(subdivisions): out.append(catmull_segment(p0,p1,p2,p3,j/subdivisions,alpha))
    out.append(points[-1])
    return out

def point_segment_distance(p,a,b):
    ab=sub(b,a); denom=dot(ab,ab)
    if denom<1e-12: return distance(p,a)
    t=max(0.0,min(1.0,dot(sub(p,a),ab)/denom))
    return distance(p,add(a,mul(ab,t)))

def metrics(points,alpha,subdivisions):
    samples=sample_curve(points,alpha,subdivisions)
    source_length=sum(distance(a,b) for a,b in zip(points,points[1:]))
    curve_length=sum(distance(a,b) for a,b in zip(samples,samples[1:]))
    if source_length<1e-8: return 0.0,0.0,0.0
    deviations=[min(point_segment_distance(p,a,b) for a,b in zip(points,points[1:])) for p in samples]
    spacing=sorted(distance(a,b) for a,b in zip(points,points[1:]))[len(points[1:])//2]
    overshoot=max(deviations,default=0.0)/max(spacing,1e-5)
    curvature_energy=0.0
    for a,b,c in zip(samples,samples[1:],samples[2:]):
        v1,v2=sub(b,a),sub(c,b); l1,l2=distance(a,b),distance(b,c)
        if l1<1e-8 or l2<1e-8: continue
        cosine=max(-1.0,min(1.0,dot(v1,v2)/(l1*l2)))
        curvature=math.acos(cosine)/max((l1+l2)*0.5,1e-6)
        curvature_energy+=curvature*curvature*(l1+l2)*0.5
    dev=(sum(x*x for x in deviations)/len(deviations))/(source_length*source_length)
    curvature=curvature_energy*source_length/max(1,len(samples))
    arc_excess=max(0.0,curve_length/source_length-1.0)
    return dev,curvature,overshoot*overshoot+arc_excess*arc_excess

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--trials",type=int,default=80)
    parser.add_argument("--seed",type=int,default=20261126)
    parser.add_argument("--output",default="artifacts/geometry-optimization.json")
    args=parser.parse_args()
    paths=extract_polylines()
    if len(paths)<10: raise SystemExit(f"Expected at least 10 centre-lines; found {len(paths)}")
    optuna.logging.set_verbosity(optuna.logging.WARNING)
    def objective(trial):
        curve_type=trial.suggest_categorical("curve_type",["centripetal","chordal"])
        alpha=0.5 if curve_type=="centripetal" else 1.0
        samples_per_unit=trial.suggest_int("samples_per_unit",20,40)
        radial_segments=trial.suggest_int("radial_segments",16,32,step=2)
        subdivisions=trial.suggest_int("samples_per_segment",8,16)
        scores=[metrics(path["points"],alpha,subdivisions) for path in paths]
        deviation=sum(x[0] for x in scores)/len(scores)
        curvature=sum(x[1] for x in scores)/len(scores)
        overshoot=sum(x[2] for x in scores)/len(scores)
        radial_error=1.0-math.cos(math.pi/radial_segments)
        longitudinal_error=1.0/(samples_per_unit*samples_per_unit)
        render_cost=samples_per_unit*radial_segments/10000.0
        return 900*deviation+0.025*curvature+0.035*overshoot+0.22*radial_error+0.10*longitudinal_error+0.018*render_cost
    study=optuna.create_study(direction="minimize",sampler=optuna.samplers.TPESampler(seed=args.seed))
    study.optimize(objective,n_trials=args.trials,show_progress_bar=False)
    best=dict(study.best_params)
    result={
        "optimizer":"Optuna TPE","seed":args.seed,"trials":args.trials,
        "objective":study.best_value,"paths_optimized":len(paths),
        "source_files":list(NETWORK_FILES),"best_params":best,
        "renderer_config":{
            "curveType":best["curve_type"],"samplesPerUnit":best["samples_per_unit"],
            "radialSegments":best["radial_segments"],"minTubularSegments":48,
            "maxTubularSegments":192,"endpointRadiusScale":0.965,"midRadiusBoost":0.02,
            "roughness":0.30,"clearcoat":0.28,"clearcoatRoughness":0.34,
            "emissiveIntensity":0.025
        }
    }
    output=ROOT/args.output
    output.parent.mkdir(parents=True,exist_ok=True)
    output.write_text(json.dumps(result,indent=2)+"\n",encoding="utf-8")
    print("OPTUNA_GEOMETRY_RESULT="+json.dumps(result,separators=(",",":")))

if __name__=="__main__": main()
