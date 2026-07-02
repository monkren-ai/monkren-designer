"""Download and process all remaining 9 philosophy card images to 240x240 JPEG."""
import urllib.request
from PIL import Image
from io import BytesIO
import os

out_dir = 'assets/philosophy-images'
os.makedirs(out_dir, exist_ok=True)
SIZE = 240

images = {
    # 42 Dieter Rams - Wikipedia CC BY-SA 3.0
    '42-dieter-rams.jpg': 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Designer-Dieter_Rams.jpg',
    # 43 Material Design 3 - Wikimedia logo
    '43-material-design-3.jpg': 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Material_you_light.png',
    # 44 Apple HIG - Apple logo from Wikimedia
    '44-apple-hig.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1024px-Apple_logo_black.svg.png',
    # 46 IDEO - office photo from officesnapshots
    '46-ideo.jpg': 'https://officesnapshots.com/wp-content/uploads/2014/03/ideo-offices-san-francisco-1.jpg',
    # 47 Frog Design - Hartmut Esslinger
    '47-frog-design.jpg': 'https://www.idesign.wiki/wp-content/uploads/2019/03/Hartmut-Esslinger.jpg',
    # 48 NN Group - Jakob Nielsen from nngroup.com
    '48-nn-group.jpg': 'https://media.nngroup.com/media/people/photos/jakob_nielsen.jpg',
    # 50 Ethan Marcotte - unstoppablerobotninja
    '50-ethan-marcotte.jpg': 'https://ethanmarcotte.com/img/ethan-marcotte.jpg',
    # 51 Brad Frost - official photo
    '51-brad-frost.jpg': 'https://bradfrost.com/wp-content/uploads/2019/11/brad_frost_ffly.png',
    # 52 Stripe Design - Stripe logo/design
    '52-stripe-design.jpg': 'https://images.ctfassets.net/fzn2n1nzq965/3PBrQuEFhOhq0sM4wW0cq0/6e18e3e663c1e26e059e286d2e06e4b7/Stripe-Logo-Blurple.png',
}

for name, url in images.items():
    out_path = os.path.join(out_dir, name)
    if os.path.exists(out_path):
        print(f"SKIP {name}")
        continue
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (design research; bot)'})
        data = urllib.request.urlopen(req, timeout=30).read()
        img = Image.open(BytesIO(data)).convert('RGB')
        w, h = img.size
        # Center crop square
        if w > h:
            left = (w - h) // 2
            img = img.crop((left, 0, left + h, h))
        elif h > w:
            top = (h - w) // 2
            img = img.crop((0, top, w, top + w))
        img = img.resize((SIZE, SIZE), Image.LANCZOS)
        img.save(out_path, 'JPEG', quality=90)
        print(f"OK {name} {img.size}")
    except Exception as e:
        print(f"FAIL {name}: {e}")

print("\nDone.")