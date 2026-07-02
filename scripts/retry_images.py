"""Retry failed image downloads with alternative URLs."""
import urllib.request
from PIL import Image
from io import BytesIO
import os

out_dir = 'assets/philosophy-images'
SIZE = 240

alt_urls = {
    '44-apple-hig.jpg': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/500px-Apple_logo_black.svg.png',
        'https://developer.apple.com/apple-logo.svg',
    ],
    '46-ideo.jpg': [
        'https://officesnapshots.com/wp-content/uploads/2020/02/ideo-offices-cambridge-1.jpg',
    ],
    '47-frog-design.jpg': [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Frog_design_logo.svg/500px-Frog_design_logo.svg.png',
    ],
    '50-ethan-marcotte.jpg': [
        'https://unstoppablerobotninja.com/img/ethan.jpg',
    ],
    '52-stripe-design.jpg': [
        'https://stripe.com/favicon.ico',
    ],
}

for name, urls in alt_urls.items():
    out_path = os.path.join(out_dir, name)
    if os.path.exists(out_path):
        print(f"SKIP {name}")
        continue
    for url in urls:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            data = urllib.request.urlopen(req, timeout=30).read()
            img = Image.open(BytesIO(data)).convert('RGB')
            w, h = img.size
            if w > h:
                left = (w - h) // 2
                img = img.crop((left, 0, left + h, h))
            elif h > w:
                top = (h - w) // 2
                img = img.crop((0, top, w, top + w))
            img = img.resize((SIZE, SIZE), Image.LANCZOS)
            img.save(out_path, 'JPEG', quality=90)
            print(f"OK {name} {img.size} ({url})")
            break
        except Exception as e:
            print(f"FAIL {name}: {url} -> {e}")
    else:
        print(f"MISS {name} - all URLs failed")