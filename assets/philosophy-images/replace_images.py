#!/usr/bin/env python3
"""Replace base64 sig-bitmap images in index.html with local file paths."""
import json
import re
from pathlib import Path

ROOT = Path("/Users/ruishengzhang/Documents/GitHub/monkren designer")
CARDS = ROOT / "assets/philosophy-images/cards.json"
HTML = ROOT / "index.html"

cards = json.loads(CARDS.read_text(encoding="utf-8"))
# all cards in numerical order
all_cards = sorted(cards, key=lambda c: c["num"])

text = HTML.read_text(encoding="utf-8")

pattern = re.compile(r'<img class="sig-bitmap" src="data:image/[^;]+;base64,[^"]+"([^>]*)>')


def replacer(match, all_cards=all_cards):
    if not replacer.queue:
        # no more cards, leave unchanged
        return match.group(0)
    card = replacer.queue.pop(0)
    attrs = match.group(1)
    return f'<img class="sig-bitmap" src="assets/philosophy-images/{card["file_name"]}"{attrs}>'


replacer.queue = list(all_cards)
new_text, count = pattern.subn(replacer, text)

if count != len(all_cards):
    print(f"WARNING: replaced {count} but expected {len(all_cards)}")
else:
    print(f"Replaced {count} base64 images with local paths")

HTML.write_text(new_text, encoding="utf-8")

# verify
remaining = re.findall(r'<img class="sig-bitmap" src="data:image/[^;]+;base64,[^"]+"', new_text)
print(f"Remaining base64 sig-bitmap: {len(remaining)}")
local = re.findall(r'<img class="sig-bitmap" src="assets/philosophy-images/[^"]+"', new_text)
print(f"Local sig-bitmap: {len(local)}")
