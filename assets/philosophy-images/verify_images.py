#!/usr/bin/env python3
"""Verify all philosophy images are 240x240 and update cards.json."""
import json
from pathlib import Path
from PIL import Image

ROOT = Path("/Users/ruishengzhang/Documents/GitHub/monkren designer")
CARDS = ROOT / "assets/philosophy-images/cards.json"
OUT_DIR = ROOT / "assets/philosophy-images"

cards = json.loads(CARDS.read_text(encoding="utf-8"))
all_ok = True
for c in cards:
    p = OUT_DIR / c["file_name"]
    if not p.exists():
        print(f"MISSING {c['num']:02d}: {p.name}")
        c["status"] = "pending"
        all_ok = False
        continue
    try:
        img = Image.open(p)
        w, h = img.size
        if (w, h) != (240, 240):
            print(f"BAD SIZE {c['num']:02d}: {p.name} = {w}x{h}")
            all_ok = False
        else:
            print(f"OK {c['num']:02d}: {p.name} {w}x{h} ({p.stat().st_size} bytes)")
            c["status"] = "done"
    except Exception as e:
        print(f"ERROR {c['num']:02d}: {p.name} - {e}")
        c["status"] = "pending"
        all_ok = False

CARDS.write_text(json.dumps(cards, ensure_ascii=False, indent=2), encoding="utf-8")
print("\nAll OK" if all_ok else "\nSome issues found")
