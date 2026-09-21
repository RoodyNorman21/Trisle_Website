#!/usr/bin/env python3
"""Generate SEO assets: 1200x630 OG image + app icons (favicon / apple-touch).

Brand mark = the Trisle island pill: black pill, subtle white ring, white dot.
OG layout: dark stage, phone screenshot crop on the right, wordmark + copy left.
"""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os

ROOT = "/home/z/my-project"
PUB = os.path.join(ROOT, "public")
APP = os.path.join(ROOT, "src/app")

BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BLACK = (5, 5, 6)
WHITE = (255, 255, 255)
ZINC = (161, 161, 170)
ZINC_DIM = (113, 113, 122)


def rounded_mask(size, radius):
    m = Image.new("L", size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return m


def draw_island(draw, cx, cy, w, h, ring=(255, 255, 255, 38), dot=1.0):
    """Draw the island pill centered at (cx, cy)."""
    x0, y0 = cx - w / 2, cy - h / 2
    draw.rounded_rectangle([x0, y0, x0 + w, y0 + h], radius=h / 2, fill=(20, 20, 22))
    draw.rounded_rectangle([x0, y0, x0 + w, y0 + h], radius=h / 2, outline=ring, width=2)
    r = h * 0.14 * dot
    draw.ellipse([cx - w * 0.28 - r, cy - r, cx - w * 0.28 + r, cy + r], fill=(255, 255, 255))
    # small right notch light
    r2 = h * 0.05
    draw.ellipse([cx + w * 0.30 - r2, cy - r2, cx + w * 0.30 + r2, cy + r2], fill=(150, 150, 155))


# ---------------------------------------------------------------- icons
def make_icon(px):
    img = Image.new("RGB", (px, px), (10, 10, 11))
    d = ImageDraw.Draw(img)
    # subtle top glow
    glow = Image.new("L", (px, px), 0)
    ImageDraw.Draw(glow).ellipse([px * 0.1, -px * 0.5, px * 0.9, px * 0.45], fill=28)
    glow = glow.filter(ImageFilter.GaussianBlur(px * 0.08))
    img.paste(Image.new("RGB", (px, px), (255, 255, 255)), (0, 0), glow)
    d = ImageDraw.Draw(img)
    s = px / 512
    draw_island(d, px / 2, px / 2, w=300 * s, h=112 * s, ring=(255, 255, 255, 60))
    img.save(os.path.join(APP, f"icon-{px}.png" if px != 512 else "icon.png"))


os.makedirs(APP, exist_ok=True)
make_icon(512)
# apple touch icon
icon = Image.open(os.path.join(APP, "icon.png")).resize((180, 180), Image.LANCZOS)
icon.save(os.path.join(APP, "apple-icon.png"))

# ---------------------------------------------------------------- OG image
W, H = 1200, 630
og = Image.new("RGB", (W, H), BLACK)

# ambient glows
glow = Image.new("L", (W, H), 0)
gd = ImageDraw.Draw(glow)
gd.ellipse([-250, -300, 700, 350], fill=22)
gd.ellipse([700, 250, 1500, 900], fill=16)
glow = glow.filter(ImageFilter.GaussianBlur(120))
og.paste(Image.new("RGB", (W, H), (255, 255, 255)), (0, 0), glow)

# faint grid
gd2 = ImageDraw.Draw(og, "RGBA")
for x in range(0, W, 60):
    gd2.line([(x, 0), (x, H)], fill=(255, 255, 255, 7), width=1)
for y in range(0, H, 60):
    gd2.line([(0, y), (W, y)], fill=(255, 255, 255, 7), width=1)

# --- right: phone crop from the demo poster
poster = Image.open(os.path.join(PUB, "videos/trisle-demo-poster.jpg")).convert("RGB")
# crop upper-middle region (island + clock area), narrower so copy has room
pw, ph = poster.size  # 720x1608
crop_h = int(ph * 0.55)
cx0, cx1 = int(pw * 0.06), int(pw * 0.94)  # 88% center width
crop = poster.crop((cx0, int(ph * 0.06), cx1, int(ph * 0.06) + crop_h))
target_h = 500
scale = target_h / crop.height
crop = crop.resize((int(crop.width * scale), target_h), Image.LANCZOS)
phone_x = W - crop.width - 58
phone_y = (H - target_h) // 2
# soft dark fade on the phone's left edge so text zone stays clean
fade = Image.new("L", crop.size, 0)
ImageDraw.Draw(fade).rectangle([0, 0, int(crop.width * 0.18), crop.height], fill=110)
fade = fade.filter(ImageFilter.GaussianBlur(30))
crop = Image.composite(Image.new("RGB", crop.size, BLACK), crop, fade)
# rounded corners + thin ring
phone_mask = rounded_mask(crop.size, 42)
og.paste(crop, (phone_x, phone_y), phone_mask)
pd = ImageDraw.Draw(og, "RGBA")
pd.rounded_rectangle(
    [phone_x, phone_y, phone_x + crop.width, phone_y + target_h],
    radius=42, outline=(255, 255, 255, 40), width=2,
)

# --- left: wordmark + copy
d = ImageDraw.Draw(og, "RGBA")
# island mark
draw_island(d, 150, 118, w=170, h=64, ring=(255, 255, 255, 70))
f_word = ImageFont.truetype(BOLD, 44)
d.text((268, 92), "TRISLE", font=f_word, fill=WHITE)

f_h1 = ImageFont.truetype(BOLD, 56)
f_h2 = ImageFont.truetype(BOLD, 56)
d.text((90, 236), "The Dynamic Island.", font=f_h1, fill=WHITE)
d.text((90, 314), "For Android.", font=f_h2, fill=(130, 130, 138))

f_sub = ImageFont.truetype(REG, 28)
d.text((92, 428), "Live Activities · Smart alerts · 100% on-device", font=f_sub, fill=ZINC)

# price chip
chip_x, chip_y, chip_w, chip_h = 92, 500, 380, 64
d.rounded_rectangle([chip_x, chip_y, chip_x + chip_w, chip_y + chip_h], radius=32,
                    fill=(255, 255, 255, 14), outline=(255, 255, 255, 46), width=2)
f_chip = ImageFont.truetype(BOLD, 27)
d.text((chip_x + 30, chip_y + 16), "€5.99", font=f_chip, fill=WHITE)
f_chip2 = ImageFont.truetype(REG, 24)
d.text((chip_x + 132, chip_y + 19), "one-time · yours forever", font=f_chip2, fill=ZINC)

og.save(os.path.join(PUB, "og.jpg"), quality=90)
print("og.jpg", og.size)
print("icon.png + apple-icon.png written to src/app")
