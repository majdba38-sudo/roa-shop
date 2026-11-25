"""
Prepare official ROA NATURE brand assets for the web.

- Removes the flat white studio background from the official logo and the
  product packshots (flood fill from the edges, so white label areas that are
  enclosed by the product stay intact).
- Trims transparent margins and exports optimised WebP files.
- Generates a square favicon from the official mark.

Run from the project root:  python scripts/prepare-brand-assets.py
"""

import os
from collections import deque

from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = ROOT  # the official JPEG files live in the project root
BRAND = os.path.join(ROOT, "public", "brand")
PRODUCTS = os.path.join(ROOT, "public", "images", "products")
os.makedirs(BRAND, exist_ok=True)
os.makedirs(PRODUCTS, exist_ok=True)


def remove_white(path, tolerance=34):
    """Flood-fill the near-white background from all four edges into alpha."""
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    px = im.load()

    # Work on a mutable boolean mask of background pixels.
    bg = [[False] * w for _ in range(h)]
    seen = [[False] * w for _ in range(h)]
    queue = deque()

    def is_white(x, y):
        r, g, b, _ = px[x, y]
        return r >= 255 - tolerance and g >= 255 - tolerance and b >= 255 - tolerance

    for x in range(w):
        for y in (0, h - 1):
            if is_white(x, y) and not seen[y][x]:
                seen[y][x] = True
                queue.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if is_white(x, y) and not seen[y][x]:
                seen[y][x] = True
                queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        bg[y][x] = True
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not seen[ny][nx] and is_white(nx, ny):
                seen[ny][nx] = True
                queue.append((nx, ny))

    alpha = Image.new("L", (w, h), 255)
    ap = alpha.load()
    for y in range(h):
        row = bg[y]
        for x in range(w):
            if row[x]:
                ap[x, y] = 0

    # Soften the cut edge by one pixel so there is no white fringe.
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.6))
    im.putalpha(alpha)
    return im


def trim(im, pad=6):
    bbox = im.getbbox()
    if not bbox:
        return im
    left, top, right, bottom = bbox
    return im.crop(
        (
            max(0, left - pad),
            max(0, top - pad),
            min(im.width, right + pad),
            min(im.height, bottom + pad),
        )
    )


def save_webp(im, path, quality=90, max_size=None):
    if max_size and max(im.size) > max_size:
        im = im.copy()
        im.thumbnail((max_size, max_size), Image.LANCZOS)
    im.save(path, "WEBP", quality=quality, method=6)
    print(os.path.relpath(path, ROOT), im.size, f"{os.path.getsize(path) / 1024:.1f} KB")


# --- Logo ---------------------------------------------------------------
logo = trim(remove_white(os.path.join(SRC, "LOGO BIG.jpeg"), tolerance=28), pad=10)
save_webp(logo, os.path.join(BRAND, "logo-full.webp"), quality=92, max_size=1000)


def make_light_variant(im):
    """Recolour the neutral grey wordmark to ivory, keep the coloured mark."""
    out = im.copy()
    px = out.load()
    for y in range(out.height):
        for x in range(out.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            # Neutral / low-chroma pixels belong to the grey wordmark.
            if max(r, g, b) - min(r, g, b) < 22:
                px[x, y] = (248, 247, 241, a)
    return out


save_webp(make_light_variant(logo), os.path.join(BRAND, "logo-full-light.webp"), quality=92, max_size=1000)

mark = trim(remove_white(os.path.join(SRC, "LOGO ICONE.jpeg"), tolerance=28), pad=8)
save_webp(mark, os.path.join(BRAND, "logo-mark.webp"), quality=92, max_size=512)

# Favicon: transparent square with the mark centred.
side = max(mark.size)
fav = Image.new("RGBA", (side, side), (0, 0, 0, 0))
fav.paste(mark, ((side - mark.width) // 2, (side - mark.height) // 2), mark)
fav.save(os.path.join(BRAND, "favicon.png"), "PNG", optimize=True)
print("public/brand/favicon.png", fav.size)

# --- Product packshots --------------------------------------------------
# Keep the studio-white background. The UI blends it into an ivory display
# arch with `mix-blend-mode: multiply`, which preserves every label detail
# (flood-filling the white background would eat white areas of the labels).
PACKSHOTS = {
    "jojoba": "OIL JOJOBA.jpeg",
    "aloe": "ALOE VERA.jpeg",
    "shampoo": "NATURAL SHAMPOO.jpeg",
    "serum": "SERUM.jpeg",
    "almond": "OIL ALMOND.jpeg",
}


def crop_content(path, pad=14, threshold=246):
    im = Image.open(path).convert("RGB")
    mask = im.convert("L").point(lambda p: 255 if p < threshold else 0)
    bbox = mask.getbbox()
    if not bbox:
        return im
    left, top, right, bottom = bbox
    return im.crop(
        (
            max(0, left - pad),
            max(0, top - pad),
            min(im.width, right + pad),
            min(im.height, bottom + pad),
        )
    )


def whiten_studio_background(im, threshold=244):
    """Flatten the studio backdrop to pure white so it disappears on the
    ivory/white display arch without a visible rectangle."""
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b = px[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                px[x, y] = (255, 255, 255)
    return im


for key, filename in PACKSHOTS.items():
    shot = crop_content(os.path.join(SRC, filename))
    shot = whiten_studio_background(shot)
    save_webp(shot, os.path.join(PRODUCTS, f"{key}.webp"), quality=92, max_size=900)

print("Done.")
