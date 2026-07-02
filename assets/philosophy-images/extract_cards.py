#!/usr/bin/env python3
"""Extract philosophy card metadata from index.html."""
import re
import json
from pathlib import Path

ROOT = Path("/Users/ruishengzhang/Documents/GitHub/monkren designer")
HTML = ROOT / "index.html"
OUT = ROOT / "assets/philosophy-images/cards.json"

DONE_FILES = {
    "12-sagmeister-walsh.jpg",
    "18-kenya-hara.jpg",
    "21-pascal-devoyre.jpg",
}

text = HTML.read_text(encoding="utf-8")

# Find philosophy-library section
start = text.find('<section id="philosophy-library"')
end = text.find('</section>', start)
section = text[start:end]

# Split by school blocks
school_blocks = re.split(r'<div class="school-block">', section)[1:]

cards = []
card_num = 0
for block in school_blocks:
    genre_match = re.search(r'<span class="genre">(.*?)</span>', block)
    if not genre_match:
        continue
    # Actually genre is per card, but school head has h3
    school_name = re.search(r'<h3>(.*?)</h3>', block)
    school_name = school_name.group(1) if school_name else ""

    card_chunks = re.split(r'<div class="philosophy-card">', block)[1:]
    for chunk in card_chunks:
        h4 = re.search(r'<h4>(.*?)</h4>', chunk)
        if not h4:
            continue
        title = h4.group(1).replace("&amp;", "&")
        genre = re.search(r'<span class="genre">(.*?)</span>', chunk)
        genre = genre.group(1) if genre else school_name
        org = re.search(r'<span class="monogram-org">(.*?)</span>', chunk)
        name = re.search(r'<span class="monogram-name">(.*?)</span>', chunk)
        card_num += 1
        file_name = f"{card_num:02d}-{re.sub(r'[^a-zA-Z0-9]+', '-', title).strip('-').lower()}.jpg"
        # shorten excessively long file names
        if len(file_name) > 60:
            parts = title.split(" — ")
            short = parts[0] if parts else title
            file_name = f"{card_num:02d}-{re.sub(r'[^a-zA-Z0-9]+', '-', short).strip('-').lower()}.jpg"
        cards.append({
            "num": card_num,
            "title": title,
            "genre": genre,
            "school": school_name,
            "monogram_org": org.group(1) if org else "",
            "monogram_name": name.group(1) if name else "",
            "file_name": file_name,
            "status": "done" if file_name in DONE_FILES else "pending",
        })

OUT.write_text(json.dumps(cards, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Extracted {len(cards)} cards to {OUT}")
for c in cards:
    mark = "✓" if c["status"] == "done" else " "
    print(f"{mark} {c['num']:02d}. {c['title']} ({c['genre']}) -> {c['file_name']}")
