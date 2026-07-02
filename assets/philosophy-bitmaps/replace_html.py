#!/usr/bin/env python3
"""
Replace 40 abstract SVG signatures in index.html with base64 PNG bitmaps + monogram labels.
Each school has 4 philosophy cards. Each school uses one of 10 PNG bitmaps.
Each card has its own monogram (org / designer combo).
"""
import json
import re

# Load base64 strings
with open("assets/philosophy-bitmaps/base64.json") as f:
    B64 = json.load(f)

# School -> bitmap code mapping
SCHOOL_BITMAP = {
    "信息建筑派": "01",
    "运动诗学派": "02",
    "极简主义派": "03",
    "实验先锋派": "04",
    "东方哲学派": "05",
    "野蛮生长派": "06",
    "后现代狂欢派": "07",
    "有机仿生派": "08",
    "复古未来派": "09",
    "极繁主义派": "10",
}

# Monogram data: card title -> (org, designer_initials)
# Note: these are extracted from the original h4 content
MONOGRAMS = {
    # School 01: 信息建筑派
    "Pentagram — Michael Bierut": ("PENTAGRAM", "MB"),
    "Stamen Design — 数据诗学": ("STAMEN", "SD"),
    "Information Architects": ("iA", "iA"),
    "Fathom — 科学叙事": ("FATHOM", "FH"),
    # School 02: 运动诗学派
    "Locomotive": ("LOCOMOTIVE", "LC"),
    "Active Theory": ("ACTIVETHEORY", "AT"),
    "Field.io": ("FIELD.IO", "FI"),
    "Resn": ("RESN", "RN"),
    # School 03: 极简主义派
    "Experimental Jetset": ("JETSET", "EJ"),
    "Müller-Brockmann — 瑞士网格": ("M-BROCK", "MB"),
    "Build in Amsterdam": ("BUILD", "BL"),
    "Sagmeister & Walsh": ("SAGMEISTER", "SW"),
    # School 04: 实验先锋派
    "Zach Lieberman — 代码诗学": ("LIEBERMAN", "ZL"),
    "Raven Kwok — 算法美学": ("RAVENKWOK", "RK"),
    "Ash Thorp": ("ASHTHORP", "AT"),
    "Territory Studio": ("TERRITORY", "TS"),
    # School 05: 东方哲学派
    "Takram": ("TAKRAM", "TK"),
    "Kenya Hara": ("KENYAHARA", "KH"),
    "Irma Boom": ("IRMABOOM", "IB"),
    "Naoto Fukasawa": ("FUKASAWA", "NF"),
    # School 06: 野蛮生长派
    "Pascal Devoyre": ("DEVOYRE", "PD"),
    "Michele Mazzini": ("MAZZINI", "MM"),
    "Bloomberg Businessweek": ("BLOOMBERG", "BW"),
    "Lotta Nieminen": ("NIEMINEN", "LN"),
    # School 07: 后现代狂欢派
    "Ettore Sottsass — 孟菲斯": ("SOTTSASS", "ES"),
    "Camille Walala": ("WALALA", "CW"),
    "Morag Myerscough": ("MYERSCOUGH", "MM"),
    "Studio Moross": ("MOROSS", "SM"),
    # School 08: 有机仿生派
    "Neri Oxman": ("OXMAN", "NO"),
    "Ross Lovegrove": ("LOVEGROVE", "RL"),
    "Daan Roosegaarde": ("ROOSEGAARDE", "DR"),
    "Heatherwick Studio": ("HEATHERWICK", "HS"),
    # School 09: 复古未来派
    "Syd Mead": ("SYDMEAD", "SM"),
    "Daniel Simon": ("DANIELSIMON", "DS"),
    "Actual Source": ("ACTUALSOURCE", "AS"),
    "Andrés Reisinger": ("REISINGER", "AR"),
    # School 10: 极繁主义派
    "David Carson": ("DAVIDCARSON", "DC"),
    "Paula Scher": ("SCHER", "PS"),
    "Peter Saville": ("SAVILLE", "PS"),
    "Kelly Wearstler": ("WEARSTLER", "KW"),
}


def build_new_signature(org, name, b64_data):
    """Build new signature div with img + monogram."""
    data_uri = f"data:image/png;base64,{b64_data}"
    return f'''              <div class="signature">
                <img class="sig-bitmap" src="{data_uri}" alt="" aria-hidden="true" />
                <div class="sig-monogram">
                  <span class="monogram-org">{org}</span>
                  <span class="monogram-name">{name}</span>
                </div>
              </div>'''


def process_school_block(html, school_name, bitmap_code):
    """Process one school block - replace 4 signature divs."""
    b64_data = B64[bitmap_code]
    # Find all philosophy-card divs within this school block
    # Pattern: <div class="philosophy-card"> ... <h4>TITLE</h4> ... <div class="signature"><svg>...</svg></div> ... </div>
    # We need to match: <div class="signature">\s*<svg ...>...</svg>\s*</div>

    # Find the school block boundaries
    # The school block contains the school's <h3>SCHOOL_NAME</h3>
    # And ends with </div></div> (closing philosophy-grid and school-block)

    # Use regex to find each <div class="signature">...</div> within the school block
    # We need to be careful to only match signatures inside this school

    # Find all 4 cards by looking for <h4>...title...</h4> and then the next signature
    pattern = re.compile(
        r'(<div class="philosophy-card">\s*'
        r'<div class="signature">\s*'
        r'<svg[^>]*>.*?</svg>\s*'
        r'</div>\s*'
        r'<h4>([^<]+)</h4>)',
        re.DOTALL
    )

    def replace_card(match):
        full_match = match.group(1)
        title = match.group(2).strip()
        if title in MONOGRAMS:
            org, name = MONOGRAMS[title]
            new_sig = build_new_signature(org, name, b64_data)
            # Replace the signature part only
            # The match contains: <div class="philosophy-card"> + <div class="signature">...</div> + <h4>title</h4>
            # We need to replace from <div class="signature"> to </div> just before <h4>
            old_pattern = re.compile(
                r'<div class="signature">\s*<svg[^>]*>.*?</svg>\s*</div>',
                re.DOTALL
            )
            return old_pattern.sub(new_sig, full_match)
        return full_match

    # We need to limit matching to this school block
    # Find the school block by looking for the h3 with school name
    school_pattern = re.compile(
        rf'(<div class="school-block">\s*<div class="school-head">\s*<span class="num">\d+</span>\s*<div>\s*<h3>{re.escape(school_name)}</h3>.*?)(</div>\s*</div>\s*</div>)',
        re.DOTALL
    )

    def replace_in_block(match):
        block_content = match.group(1)
        closing = match.group(2)
        block_content_new = pattern.sub(replace_card, block_content)
        return block_content_new + closing

    return school_pattern.sub(replace_in_block, html)


def main():
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()

    original_count = html.count('<svg viewBox="0 0 40 40"')
    print(f"Found {original_count} philosophy signature SVGs to replace")

    for school_name, bitmap_code in SCHOOL_BITMAP.items():
        html = process_school_block(html, school_name, bitmap_code)

    new_svg_count = html.count('<svg viewBox="0 0 40 40"')
    new_b64_count = html.count('class="sig-bitmap"')
    new_mono_count = html.count('class="monogram-org"')

    print(f"After: {new_svg_count} philosophy SVGs remaining, {new_b64_count} bitmaps, {new_mono_count} monograms")

    with open("index.html", "w", encoding="utf-8") as f:
        f.write(html)

    print("Done")


if __name__ == "__main__":
    main()
