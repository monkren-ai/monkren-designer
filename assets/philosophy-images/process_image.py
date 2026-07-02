#!/usr/bin/env python3
"""Crop and resize an image to 240x240 square JPEG."""
import sys
from pathlib import Path
from PIL import Image

SIZE = 240


def process(src: str, dst: str):
    img = Image.open(src).convert("RGB")
    w, h = img.size
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    img = img.crop((left, top, left + min_dim, top + min_dim))
    img = img.resize((SIZE, SIZE), Image.LANCZOS)
    img.save(dst, "JPEG", quality=90, optimize=True)
    print(f"saved {dst} ({img.size})")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("usage: process_image.py <src> <dst>")
        sys.exit(1)
    process(sys.argv[1], sys.argv[2])
