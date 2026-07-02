#!/usr/bin/env python3
"""Download representative images for pending philosophy cards."""
import json
import re
import time
import urllib.parse
from pathlib import Path
from PIL import Image
import requests
from duckduckgo_search import DDGS

ROOT = Path("/Users/ruishengzhang/Documents/GitHub/monkren designer")
CARDS = ROOT / "assets/philosophy-images/cards.json"
OUT_DIR = ROOT / "assets/philosophy-images"
SIZE = 240

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


def is_usable_image(url: str) -> bool:
    """Skip icons, logos, tiny images, and SVGs."""
    if not url:
        return False
    lower = url.lower()
    if lower.endswith(".svg"):
        return False
    # skip favicon/common icon paths
    if any(x in lower for x in ["favicon", "icon", "logo", "avatar", "profile"]):
        return False
    return True


def process_image(src_path: Path, dst_path: Path, size: int = SIZE):
    img = Image.open(src_path).convert("RGB")
    w, h = img.size
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    img = img.crop((left, top, left + min_dim, top + min_dim))
    img = img.resize((size, size), Image.LANCZOS)
    img.save(dst_path, "JPEG", quality=90, optimize=True)


def download_image(url: str, dst_path: Path) -> bool:
    try:
        resp = requests.get(url, headers=HEADERS, timeout=30)
        if resp.status_code != 200:
            return False
        ct = resp.headers.get("content-type", "")
        if not ct.startswith("image/"):
            return False
        tmp = dst_path.with_suffix(".tmp")
        tmp.write_bytes(resp.content)
        process_image(tmp, dst_path)
        tmp.unlink()
        return True
    except Exception as e:
        print(f"    error downloading {url}: {e}")
        return False


def search_and_download(card):
    keywords = card.get("search_keywords", card["title"])
    print(f"[{card['num']:02d}] {card['title']} -> searching: {keywords}")
    try:
        with DDGS() as ddgs:
            results = ddgs.images(keywords, max_results=10)
    except Exception as e:
        print(f"    search error: {e}")
        return False

    for r in results:
        url = r.get("image") or r.get("url") or r.get("thumbnail")
        if not is_usable_image(url):
            continue
        print(f"    trying {url[:80]}...")
        dst = OUT_DIR / card["file_name"]
        if download_image(url, dst):
            print(f"    saved {dst.name} ({dst.stat().st_size} bytes)")
            return True
        time.sleep(0.5)
    print(f"    failed to find image")
    return False


def main():
    cards = json.loads(CARDS.read_text(encoding="utf-8"))
    pending = [c for c in cards if c["status"] == "pending"]
    print(f"Pending cards: {len(pending)}")
    for card in pending:
        if search_and_download(card):
            card["status"] = "done"
        time.sleep(2)  # be polite to DDGS
    CARDS.write_text(json.dumps(cards, ensure_ascii=False, indent=2), encoding="utf-8")
    done = sum(1 for c in cards if c["status"] == "done")
    print(f"\nTotal done: {done}/{len(cards)}")


if __name__ == "__main__":
    main()
