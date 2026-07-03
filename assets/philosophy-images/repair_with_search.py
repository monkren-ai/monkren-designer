#!/usr/bin/env python3
"""
Repair placeholder/corrupt philosophy images by searching real web images.

Uses DuckDuckGo image search + PIL to find and crop representative 240x240 JPEGs.
"""

import json
import time
import urllib.parse
from pathlib import Path
from PIL import Image
import requests
from ddgs import DDGS

ROOT = Path("/Users/ruishengzhang/Documents/GitHub/monkren designer")
CARDS = ROOT / "assets/philosophy-images/cards.json"
OUT_DIR = ROOT / "assets/philosophy-images"
SIZE = 240

# Placeholder image size from async API (tolerance allowed)
PLACEHOLDER_SIZE = 7810
PLACEHOLDER_TOLERANCE = 200
MIN_VALID_SIZE = 3000

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


def is_placeholder(filepath: Path) -> bool:
    if not filepath.exists():
        return True
    size = filepath.stat().st_size
    return abs(size - PLACEHOLDER_SIZE) <= PLACEHOLDER_TOLERANCE


def is_too_small(filepath: Path) -> bool:
    if not filepath.exists():
        return True
    return filepath.stat().st_size < MIN_VALID_SIZE


def needs_repair(filepath: Path) -> bool:
    if is_placeholder(filepath) or is_too_small(filepath):
        return True
    try:
        img = Image.open(filepath)
        img.verify()
        return False
    except Exception:
        return True


def is_usable_image(url: str) -> bool:
    if not url:
        return False
    lower = url.lower()
    if lower.endswith(".svg"):
        return False
    if any(x in lower for x in ["favicon", "icon", "logo", "avatar", "profile"]):
        return False
    return True


def process_image(src_path: Path, dst_path: Path, size: int = SIZE) -> bool:
    try:
        img = Image.open(src_path).convert("RGB")
        w, h = img.size
        min_dim = min(w, h)
        left = (w - min_dim) // 2
        top = (h - min_dim) // 2
        img = img.crop((left, top, left + min_dim, top + min_dim))
        img = img.resize((size, size), Image.LANCZOS)
        img.save(dst_path, "JPEG", quality=90, optimize=True)
        return True
    except Exception as e:
        print(f"    process error: {e}")
        return False


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
        if process_image(tmp, dst_path):
            tmp.unlink()
            return True
        tmp.unlink()
        return False
    except Exception as e:
        print(f"    download error: {e}")
        return False


def search_with_retry(keywords: str, max_retries: int = 3):
    """Search images with rate-limit retry."""
    for attempt in range(max_retries):
        try:
            with DDGS() as ddgs:
                return ddgs.images(keywords, max_results=10)
        except Exception as e:
            msg = str(e)
            if "403" in msg or "Ratelimit" in msg:
                wait = 30 + attempt * 30  # 30, 60, 90
                print(f"    rate limited, waiting {wait}s before retry {attempt + 1}/{max_retries}")
                time.sleep(wait)
            else:
                print(f"    search error: {e}")
                return None
    return None


def search_and_download(card):
    keywords = card.get("search_keywords", card["title"])
    num = card["num"]
    title = card["title"]
    dst = OUT_DIR / card["file_name"]
    print(f"[{num:02d}] {title}")
    print(f"    searching: {keywords}")

    results = search_with_retry(keywords)
    if not results:
        print(f"    failed to search")
        return False

    for r in results:
        url = r.get("image") or r.get("url") or r.get("thumbnail")
        if not is_usable_image(url):
            continue
        print(f"    trying {url[:80]}...")
        if download_image(url, dst):
            print(f"    saved {dst.name} ({dst.stat().st_size} bytes)")
            return True
        time.sleep(0.5)

    print(f"    failed to find image")
    return False


def main():
    cards = json.loads(CARDS.read_text(encoding="utf-8"))

    # Collect cards that need repair
    to_repair = []
    for card in cards:
        dst = OUT_DIR / card["file_name"]
        if needs_repair(dst):
            to_repair.append(card)

    print(f"Images needing repair: {len(to_repair)}")
    if not to_repair:
        print("All images look valid.")
        return

    success = 0
    failed = []

    for card in to_repair:
        if search_and_download(card):
            success += 1
        else:
            failed.append(f"{card['num']:02d}-{card['file_name']}")
        time.sleep(10)

    print("\n=== SUMMARY ===")
    print(f"Success: {success}/{len(to_repair)}")
    if failed:
        print(f"Failed: {', '.join(failed)}")
    else:
        print("All images repaired successfully.")


if __name__ == "__main__":
    main()
