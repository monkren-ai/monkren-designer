#!/usr/bin/env python3
"""Final verification for philosophy card images."""
import json
import re
from pathlib import Path

ROOT = Path("/Users/ruishengzhang/Documents/GitHub/monkren designer")
CARDS = ROOT / "assets/philosophy-images/cards.json"
HTML = ROOT / "index.html"
IMG_DIR = ROOT / "assets/philosophy-images"

text = HTML.read_text(encoding="utf-8")
cards = json.loads(CARDS.read_text(encoding="utf-8"))

# 1. base64 check
base64_imgs = re.findall(r'<img class="sig-bitmap" src="data:image/[^;]+;base64,[^"]+"', text)
print(f"1. base64 sig-bitmap count: {len(base64_imgs)} (expect 0)")

# 2. local image references
local_refs = re.findall(r'<img class="sig-bitmap" src="(assets/philosophy-images/[^"]+)"', text)
print(f"2. local sig-bitmap count: {len(local_refs)} (expect 40)")

# 3. all referenced files exist
missing = []
for ref in local_refs:
    p = ROOT / ref
    if not p.exists():
        missing.append(ref)
print(f"3. missing local files: {len(missing)}")
for m in missing:
    print(f"   {m}")

# 4. all 40 expected files exist
expected = {c["file_name"] for c in cards}
actual = {p.name for p in IMG_DIR.glob("*.jpg")}
missing_files = expected - actual
extra_files = actual - expected
print(f"4. expected JPG files missing: {len(missing_files)}")
for m in sorted(missing_files):
    print(f"   {m}")
print(f"5. unexpected JPG files: {len(extra_files)}")
for e in sorted(extra_files):
    print(f"   {e}")

# 6. monogram count
monograms = re.findall(r'<span class="monogram-org">([^<]+)</span>', text)
print(f"6. monogram-org count: {len(monograms)} (expect 40)")

# 7. remote image URLs (should be 0 in philosophy section)
philosophy_start = text.find('<section id="philosophy-library"')
philosophy_end = text.find('</section>', philosophy_start)
philosophy_section = text[philosophy_start:philosophy_end]
remote = re.findall(r'https?://[^\s"<>]+\.(?:jpg|jpeg|png|gif|webp)', philosophy_section)
print(f"7. remote image URLs in philosophy section: {len(remote)} (expect 0)")
for r in remote[:5]:
    print(f"   {r}")

print("\nPASS" if (len(base64_imgs) == 0 and len(local_refs) == 40 and not missing and not missing_files and len(remote) == 0) else "\nFAIL")
