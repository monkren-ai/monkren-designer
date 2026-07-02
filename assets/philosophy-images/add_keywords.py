#!/usr/bin/env python3
"""Add search keywords to cards.json."""
import json
from pathlib import Path

ROOT = Path("/Users/ruishengzhang/Documents/GitHub/monkren designer")
CARDS = ROOT / "assets/philosophy-images/cards.json"

KEYWORDS = {
    1: "Michael Bierut Pentagram Yale architecture poster typography",
    2: "Stamen Design data visualization map information graphics",
    3: "Information Architects iA Writer website design typography",
    4: "Fathom information design data visualization scientific narrative",
    5: "Locomotive web design agency interactive portfolio",
    6: "Active Theory interactive web experience creative agency",
    7: "Field.io digital art installation generative design",
    8: "Resn interactive web design digital experience",
    9: "Experimental Jetset typography poster graphic design",
    10: "Josef Müller-Brockmann grid poster Swiss style",
    11: "Build in Amsterdam web design agency portfolio",
    13: "Zach Lieberman generative art code poetry",
    14: "Raven Kwok generative art algorithmic aesthetics",
    15: "Ash Thorp title sequence motion design",
    16: "Territory Studio UI design film screen graphics",
    17: "Takram design engineering Tokyo studio",
    19: "Irma Boom book design experimental typography",
    20: "Naoto Fukasawa product design Muji minimal",
    22: "Michele Mazzini graphic design brutalist poster",
    23: "Bloomberg Businessweek cover design editorial graphic",
    24: "Lotta Nieminen illustration graphic design studio",
    25: "Ettore Sottsass Memphis design movement objects",
    26: "Camille Walala pattern design colorful architecture",
    27: "Morag Myerscough public art installation color",
    28: "Studio Moross music poster graphic design",
    29: "Neri Oxman art science design organic",
    30: "Ross Lovegrove organic design product form",
    31: "Daan Roosegaarde interactive design light installation",
    32: "Heatherwick Studio architecture design sculpture building",
    33: "Syd Mead concept art Blade Runner futuristic",
    34: "Daniel Simon concept vehicle design futuristic",
    35: "Actual Source graphic design studio publication",
    36: "Andres Reisinger digital art surreal furniture",
    37: "David Carson typography grunge Ray Gun magazine",
    38: "Paula Scher typography map Pentagram poster",
    39: "Peter Saville album cover Unknown Pleasures design",
    40: "Kelly Wearstler interior design maximalist pattern",
}

cards = json.loads(CARDS.read_text(encoding="utf-8"))
for c in cards:
    if c["status"] == "pending" and c["num"] in KEYWORDS:
        c["search_keywords"] = KEYWORDS[c["num"]]

CARDS.write_text(json.dumps(cards, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Updated {len([c for c in cards if 'search_keywords' in c])} cards with keywords")
