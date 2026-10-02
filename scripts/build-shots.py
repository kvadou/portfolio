"""Convert reviewed captures in shots-raw/<folder>/ into public/shots/<slug>/*.webp
and write lib/shots-manifest.json. captions.tsv rows: file<TAB>caption[<TAB>target-slug]."""
import json, pathlib, shutil
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
RAW, OUT = ROOT / "shots-raw", ROOT / "public" / "shots"
MAX_W = 2400
manifest: dict[str, list] = {}
shutil.rmtree(OUT, ignore_errors=True)  # rebuild from reviewed captions only

for folder in sorted(p for p in RAW.iterdir() if p.is_dir()):
    tsv = folder / "captions.tsv"
    if not tsv.exists():
        continue
    seen = set()
    for line in tsv.read_text().splitlines():
        parts = line.split("\t")
        if len(parts) < 2 or not parts[0].endswith(".png"):
            continue
        file, caption = parts[0].strip(), parts[1].strip()
        slug = parts[2].strip() if len(parts) > 2 and parts[2].strip() else folder.name
        src = folder / file
        if not src.exists() or (slug, file) in seen:
            continue
        seen.add((slug, file))
        im = Image.open(src).convert("RGB")
        if im.width > MAX_W:
            im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
        dest = OUT / slug / file.replace(".png", ".webp")
        dest.parent.mkdir(parents=True, exist_ok=True)
        im.save(dest, "WEBP", quality=82, method=6)
        manifest.setdefault(slug, []).append({"file": dest.name, "caption": caption, "w": im.width, "h": im.height})

for v in manifest.values():
    v.sort(key=lambda e: e["file"])
(ROOT / "lib" / "shots-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
print({k: len(v) for k, v in manifest.items()})
