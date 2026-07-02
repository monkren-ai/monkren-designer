#!/usr/bin/env python3
"""Process 3 PoC philosophy images to 240x240 squares."""
from PIL import Image
import os

OUT_DIR = os.path.dirname(os.path.abspath(__file__))
SIZE = 240

IMAGES = {
    "12-sagmeister-walsh.jpg": "sagmeister_test.jpg",
    "18-kenya-hara.jpg": "kenya_hara_test.jpg",
    "21-pascal-devoyre.jpg": "devoyre_test.jpg",
}


def make_square(src_path, dst_path, size=SIZE):
    img = Image.open(src_path).convert("RGB")
    w, h = img.size
    # Crop to center square
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    img = img.crop((left, top, left + min_dim, top + min_dim))
    img = img.resize((size, size), Image.LANCZOS)
    img.save(dst_path, "JPEG", quality=90, optimize=True)
    print(f"  {dst_path}: {img.size}")


def main():
    for out_name, src_name in IMAGES.items():
        src = os.path.join(OUT_DIR, src_name)
        dst = os.path.join(OUT_DIR, out_name)
        make_square(src, dst)
        # Remove temporary downloaded file
        os.remove(src)
        print(f"  removed temp {src_name}")


if __name__ == "__main__":
    main()
