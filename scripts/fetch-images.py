import io, os, urllib.request
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "images")
os.makedirs(OUT, exist_ok=True)

SOURCES = {
    "hero": ("photo-1425913397330-cf8af2ff40a1", 2200, 16/9, "forest"),
    "clearing": ("photo-1502082553048-f009c37129b9", 2000, 16/9, "forest"),
    "station-jojoba": ("photo-1441974231531-c6227db76b6e", 1900, 16/10, "forest"),
    "station-aloe": ("photo-1552083375-1447ce886485", 1900, 16/10, "forest"),
    "station-herbs": ("photo-1518495973542-4542c06a5843", 1900, 16/10, "forest"),
    "station-frankincense": ("photo-1542273917363-3b1817f69a2d", 1900, 16/10, "forest"),
    "station-almond": ("photo-1440581572325-0bea30075d9d", 1900, 16/10, "forest"),
    "about-forest": ("photo-1513836279014-a89f7a76ae86", 1400, 4/5, "forest"),
    "ingredient-leaf": ("photo-1518531933037-91b2f5f229cc", 700, 1, "square"),
    "ingredient-aloe": ("photo-1596547609652-9cf5d8d76921", 700, 1, "square"),
    "ingredient-herbs": ("photo-1515586000433-45406d8e6662", 700, 1, "square"),
    "ingredient-almond": ("photo-1508061253366-f7da158b6d46", 700, 1, "square"),
    "ingredient-frankincense": ("photo-1440581572325-0bea30075d9d", 700, 1, "square"),
}

def fetch(pid, w):
    url = f"https://images.unsplash.com/{pid}?w={w}&q=85&auto=format&fit=crop"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=120) as r:
        return r.read()

def crop_ratio(im, ratio):
    w, h = im.size
    target = ratio
    if w / h > target:
        nw = int(h * target)
        left = (w - nw) // 2
        return im.crop((left, 0, left + nw, h))
    nh = int(w / target)
    top = int((h - nh) * 0.42)
    return im.crop((0, top, w, top + nh))

for name, (pid, width, ratio, kind) in SOURCES.items():
    try:
        raw = fetch(pid, width)
        im = Image.open(io.BytesIO(raw)).convert("RGB")
        im = crop_ratio(im, ratio)
        im = im.resize((width, int(width / ratio)), Image.LANCZOS)
        im = ImageOps.autocontrast(im, cutoff=0.4)
        out = os.path.join(OUT, name + ".webp")
        im.save(out, "WEBP", quality=82, method=6)
        if kind == "forest":
            sm = im.resize((1000, int(1000 / ratio)), Image.LANCZOS)
            sm.save(os.path.join(OUT, name + "-sm.webp"), "WEBP", quality=78, method=6)
        print(name, im.size, round(os.path.getsize(out) / 1024), "KB")
    except Exception as e:
        print("ERROR", name, e)
