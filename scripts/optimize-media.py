#!/usr/bin/env python3
"""Task 15 Lighthouse fixes: right-size marketing media to 2x display size.

- 4 app screenshots: 1080x2400 PNG (~150 KiB each) displayed at ~234x520 CSS px
  -> resize to 468x1040 (2x retina) and encode WebP q82.
- hero video poster: 720x1489 JPEG displayed at 290x648 max
  -> resize to 580x1200 (2x) JPEG q80, same filename (no code change).
Run from repo root. Idempotent: skips files already at target size.
"""
from pathlib import Path
from PIL import Image

SHOTS = Path("public/screenshots")
POSTER = Path("public/videos/trisle-demo-poster.jpg")

for src in sorted(SHOTS.glob("app-*.png")):
    out = src.with_suffix(".webp")
    with Image.open(src) as im:
        w, h = im.size
        if out.exists() and Image.open(out).size == (468, 1040):
            print(f"skip {out.name} (already 468x1040)")
            continue
        resized = im.resize((468, 1040), Image.LANCZOS)
        resized.save(out, "WEBP", quality=82, method=6)
    print(f"{src.name} {w}x{h} -> {out.name} 468x1040 "
          f"({src.stat().st_size//1024} KiB -> {out.stat().st_size//1024} KiB)")

with Image.open(POSTER) as im:
    w, h = im.size
    target = (580, round(580 * h / w))
    if im.size != (580, 1200) and target[1] != 1200:
        target = (580, 1200)  # aspect is 0.4835 -> 1199; snap to even 1200
    if Image.open(POSTER).size == (580, 1200):
        print("skip poster (already 580x1200)")
    else:
        resized = im.resize(target, Image.LANCZOS)
        resized.save(POSTER, "JPEG", quality=80, optimize=True, progressive=True)
        print(f"poster {w}x{h} -> {target[0]}x{target[1]} "
              f"({POSTER.with_name('trisle-demo-poster.old')} n/a; "
              f"new {POSTER.stat().st_size//1024} KiB)")
