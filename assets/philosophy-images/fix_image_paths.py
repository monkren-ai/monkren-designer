#!/usr/bin/env python3
"""Fix sig-bitmap image paths by matching card order in index.html."""
import json
import re
from pathlib import Path

ROOT = Path("/Users/ruishengzhang/Documents/GitHub/monkren designer")
CARDS = ROOT / "assets/philosophy-images/cards.json"
HTML = ROOT / "index.html"

cards = json.loads(CARDS.read_text(encoding="utf-8"))
file_by_num = {c["num"]: c["file_name"] for c in cards}

text = HTML.read_text(encoding="utf-8")

# Find philosophy-library section
start = text.find('<section id="philosophy-library"')
end = text.find('</section>', start)
section = text[start:end]

# Split into card chunks
card_chunks = re.split(r'(<div class="philosophy-card">)', section)

# The first element is before the first card, then alternating separator and card content
new_chunks = [card_chunks[0]]
card_num = 0
for i in range(1, len(card_chunks), 2):
    separator = card_chunks[i]
    content = card_chunks[i + 1]
    card_num += 1
    file_name = file_by_num[card_num]
    # replace sig-bitmap src in this card content
    new_content = re.sub(
        r'<img class="sig-bitmap" src="[^"]+"',
        f'<img class="sig-bitmap" src="assets/philosophy-images/{file_name}"',
        content,
        count=1,
    )
    new_chunks.append(separator)
    new_chunks.append(new_content)

new_section = ''.join(new_chunks)
new_text = text[:start] + new_section + text[end:]

HTML.write_text(new_text, encoding="utf-8")
print(f"Fixed {card_num} card image paths")

# verify
remaining = re.findall(r'<img class="sig-bitmap" src="data:image/[^;]+;base64,[^"]+"', new_text)
print(f"Remaining base64 sig-bitmap: {len(remaining)}")
