import urllib.request
from PIL import Image
from io import BytesIO
import os

out_dir = 'assets/philosophy-images'
os.makedirs(out_dir, exist_ok=True)

urls = [
    ('41-jony-ive.jpg', 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Jonathan_Ive_%28OTRS%29.jpg'),
    ('45-don-norman.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/d5/MMG_-_Don_Norman_-_5553249364.jpg'),
    ('49-jeffrey-zeldman.jpg', 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Jeffrey_Zeldman_onstage_at_An_Event_Apart.jpg'),
]

SIZE = 240

for name, url in urls:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (design research; bot)'})
    data = urllib.request.urlopen(req, timeout=30).read()
    img = Image.open(BytesIO(data)).convert('RGB')
    w, h = img.size
    # center crop square
    if w > h:
        left = (w - h) // 2
        top = 0
        side = h
    elif h > w:
        left = 0
        top = (h - w) // 2
        side = w
    else:
        left = top = 0
        side = w
    img = img.crop((left, top, left + side, top + side))
    img = img.resize((SIZE, SIZE), Image.LANCZOS)
    out_path = os.path.join(out_dir, name)
    img.save(out_path, 'JPEG', quality=90)
    print(f"saved {out_path} {img.size}")
