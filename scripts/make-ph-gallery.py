#!/usr/bin/env python3
"""Generate Product Hunt gallery assets for Trisle (ph-gallery-assets skill).

Story framework: Hook -> Problem -> Solution -> Feature 1 -> Feature 2 -> CTA.
Style matches the website: #050506 black, white type, thin zinc borders,
island capsule motif. Facts only — no invented metrics.
Canvas: 1600x960 (5:3, PH-recommended ratio).
"""
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1600, 960
BG = (5, 5, 6)
PANEL = (11, 11, 12)
WHITE = (255, 255, 255)
BODY = (161, 161, 170)
MUTED = (124, 124, 134)
LINE = (42, 42, 46)
CHIPBG = (18, 18, 20)

OUT = "/home/z/my-project/download/ph-gallery"
SHOT = "/home/z/my-project/public/screenshots"
VIDEO = "/home/z/my-project/public/videos"

BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

def font(path, size):
    return ImageFont.truetype(path, size)

def canvas():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    # subtle vignette ring, same spirit as the site's grid
    for i, a in enumerate(range(60, 0, -12)):
        r = 560 + i * 130
        d.ellipse([W // 2 - r, H // 2 - r, W // 2 + r, H // 2 + r],
                  outline=(8 + a // 8, 8 + a // 8, 10 + a // 8), width=2)
    return img, d

def chip(d, x, y, text, f, pad=22, fill=CHIPBG, outline=LINE, fg=BODY):
    bb = d.textbbox((0, 0), text, font=f)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    d.rounded_rectangle([x, y, x + tw + pad * 2, y + th + pad * 1.4],
                        radius=(th + pad * 1.4) / 2, fill=fill, outline=outline, width=2)
    d.text((x + pad, y + pad * 0.7 - bb[1]), text, font=f, fill=fg)
    return tw + pad * 2

def capsule(d, cx, cy, w, h, fill=(0, 0, 0), outline=WHITE, width=4, eq=False):
    d.rounded_rectangle([cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2],
                        radius=h / 2, fill=fill, outline=outline, width=width)
    if eq:
        bar_w, gap = 9, 14
        heights = [h * 0.38, h * 0.62, h * 0.46, h * 0.7]
        total = len(heights) * bar_w + (len(heights) - 1) * gap
        x0 = cx - total / 2
        for i, bh in enumerate(heights):
            bx = x0 + i * (bar_w + gap)
            d.rounded_rectangle([bx, cy - bh / 2, bx + bar_w, cy + bh / 2],
                                radius=bar_w / 2, fill=WHITE)

def bubble(d, cx, cy, r, outline=WHITE, width=3):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=outline, width=width)

def phone_bezel(img, shot_path, target_h, cx, cy):
    """Paste a real screenshot inside a thin bezel, centered at (cx, cy)."""
    shot = Image.open(shot_path).convert("RGB")
    ratio = shot.width / shot.height
    ih = target_h
    iw = int(ih * ratio)
    shot = shot.resize((iw, ih), Image.LANCZOS)
    bezel_pad = 14
    bezel = Image.new("RGB", (iw + bezel_pad * 2, ih + bezel_pad * 2), (0, 0, 0))
    bd = ImageDraw.Draw(bezel)
    bd.rounded_rectangle([0, 0, bezel.width - 1, bezel.height - 1], radius=44,
                         fill=(0, 0, 0), outline=(60, 60, 66), width=3)
    mask = Image.new("L", (iw, ih), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, iw - 1, ih - 1], radius=32, fill=255)
    bezel.paste(shot, (bezel_pad, bezel_pad), mask)
    img.paste(bezel, (int(cx - bezel.width / 2), int(cy - bezel.height / 2)))
    return bezel.width, bezel.height

# ---------------------------------------------------------------- 01 HOOK
def img1_hook():
    img, d = canvas()
    f_word = font(BOLD, 150)
    f_tag = font(REG, 46)
    f_small = font(REG, 30)

    # island trio above the wordmark
    cy = 190
    capsule(d, W // 2 - 330, cy + 46, 210, 64, eq=False)
    capsule(d, W // 2, cy, 430, 88, eq=True)
    capsule(d, W // 2 + 330, cy + 46, 210, 64, eq=False)

    d.text((W // 2, 430), "TRISLE", font=f_word, fill=WHITE, anchor="mm")
    d.text((W // 2, 545), "The Dynamic Island. For Android.", font=f_tag, fill=BODY, anchor="mm")

    x = W // 2 - 260
    chip(d, x, 660, "€5.99 once — yours forever", f_small)
    chip(d, x + 480, 660, "No subscription", f_small)
    d.text((W // 2, 800), "trisle-app.github.io/Trisle_Website", font=f_small,
           fill=MUTED, anchor="mm")
    img.save(f"{OUT}/01-hook.png")

# ---------------------------------------------------------------- 02 PROBLEM
def img2_problem():
    img, d = canvas()
    f_h = font(BOLD, 78)
    f_item = font(REG, 44)
    f_note = font(REG, 34)
    d.text((W // 2, 170), "Sound familiar?", font=f_h, fill=WHITE, anchor="mm")
    items = [
        "Notification banners cover whatever you're doing",
        "Music controls mean leaving the app you're in",
        "Directions take over the entire screen",
    ]
    y = 330
    for it in items:
        bx = 300
        d.ellipse([bx, y - 22, bx + 44, y + 22], outline=(120, 120, 130), width=3)
        d.line([bx + 13, y - 9, bx + 31, y + 9], fill=(120, 120, 130), width=3)
        d.line([bx + 13, y + 9, bx + 31, y - 9], fill=(120, 120, 130), width=3)
        d.text((bx + 76, y), it, font=f_item, fill=BODY, anchor="lm")
        y += 130
    d.text((W // 2, y + 60), "There's a better way.", font=f_note, fill=MUTED, anchor="mm")
    img.save(f"{OUT}/02-problem.png")

# ---------------------------------------------------------------- 03 SOLUTION
def img3_solution():
    img, d = canvas()
    f_h = font(BOLD, 64)
    f_col = font(BOLD, 40)
    f_cap = font(REG, 30)
    d.text((W // 2, 120), "One capsule. Always up top.", font=f_h, fill=WHITE, anchor="mm")

    mx = W // 2
    # BEFORE panel
    px, pw, ph = 200, 520, 560
    for dx, label, before in ((px - mx, "BEFORE", True), (mx - px + 0, "AFTER", False)):
        pass
    # left panel
    d.rounded_rectangle([px, 240, px + pw, 240 + ph], radius=36, fill=PANEL, outline=LINE, width=2)
    d.text((px + pw / 2, 290), "BEFORE", font=f_col, fill=MUTED, anchor="mm")
    # stacked banner rectangles covering a content sketch
    for i in range(4):
        by = 360 + i * 100
        d.rounded_rectangle([px + 60, by, px + pw - 60, by + 70], radius=16,
                            fill=(20, 20, 22), outline=(55, 55, 60), width=2)
        d.line([px + 90, by + 35, px + pw - 90, by + 35], fill=(45, 45, 50), width=8)
    d.text((px + pw / 2, 860), "banners pile up over your content", font=f_cap,
           fill=MUTED, anchor="mm")

    # AFTER panel (mirrored)
    qx = W - px - pw
    d.rounded_rectangle([qx, 240, qx + pw, 240 + ph], radius=36, fill=PANEL, outline=LINE, width=2)
    d.text((qx + pw / 2, 290), "AFTER", font=f_col, fill=WHITE, anchor="mm")
    # island pill at top, content lines below (clean)
    capsule(d, qx + pw / 2, 395, 300, 66, outline=WHITE, width=4, eq=True)
    for i in range(3):
        ly = 520 + i * 90
        d.rounded_rectangle([qx + 60, ly, qx + pw - 60, ly + 56], radius=14,
                            fill=(16, 16, 18), outline=(38, 38, 42), width=2)
    d.text((qx + pw / 2, 860), "one island floats above every app", font=f_cap,
           fill=BODY, anchor="mm")

    d.text((mx, 560), "→", font=font(BOLD, 64), fill=WHITE, anchor="mm")
    img.save(f"{OUT}/03-solution.png")

# ---------------------------------------------------------------- 04 FEATURE: LIVE ACTIVITIES
def img4_activities():
    img, d = canvas()
    f_h = font(BOLD, 72)
    f_sub = font(REG, 40)
    f_chip = font(REG, 30)
    bw, bh = phone_bezel(img, f"{VIDEO}/trisle-demo-poster.webp", 760, 1170, 500)
    d.text((200, 300), "Live Activities", font=f_h, fill=WHITE, anchor="lm")
    d.text((200, 390), "Music, Google Maps, timers and calls —", font=f_sub, fill=BODY, anchor="lm")
    d.text((200, 450), "live at the top of your screen.", font=f_sub, fill=BODY, anchor="lm")
    chip(d, 200, 560, "Spotify · YT Music · Apple Music", f_chip)
    chip(d, 200, 640, "Google Maps turn-by-turn", f_chip)
    chip(d, 200, 720, "Timers & calls", f_chip)
    img.save(f"{OUT}/04-live-activities.png")

# ---------------------------------------------------------------- 05 FEATURE: TRIPLE ISLAND
def img5_triple():
    img, d = canvas()
    f_h = font(BOLD, 72)
    f_sub = font(REG, 40)
    d.text((W // 2, 190), "Triple Island", font=f_h, fill=WHITE, anchor="mm")
    d.text((W // 2, 270), "Run up to three activities at once.", font=f_sub, fill=BODY, anchor="mm")
    cy = 560
    capsule(d, W // 2 - 430, cy, 340, 100, eq=True)
    capsule(d, W // 2, cy - 40, 500, 130, eq=False)
    # music content inside the main capsule, mirroring the real expanded island
    f_caps = font(BOLD, 42)
    d.text((W // 2 - 140, cy - 40), "♪", font=font(BOLD, 58), fill=WHITE, anchor="lm")
    d.text((W // 2 - 60, cy - 58), "Night Drive", font=f_caps, fill=WHITE, anchor="lm")
    d.text((W // 2 - 60, cy + 2), "Now Playing · 1:24", font=font(REG, 30), fill=MUTED, anchor="lm")
    bubble(d, W // 2 + 430, cy, 92)
    # mini icons inside the bubbles: timer hand + nav arrow
    d.line([W // 2 + 430, cy, W // 2 + 430, cy - 52], fill=WHITE, width=6)
    d.polygon([(W // 2 + 405, cy + 30), (W // 2 + 455, cy + 30), (W // 2 + 430, cy - 10)],
              outline=WHITE, width=4)
    d.text((W // 2, 790), "A main capsule flanked by detached bubbles — tap to swap.",
           font=f_sub, fill=MUTED, anchor="mm")
    img.save(f"{OUT}/05-triple-island.png")

# ---------------------------------------------------------------- 06 CTA
def img6_cta():
    img, d = canvas()
    f_h = font(BOLD, 96)
    f_sub = font(REG, 44)
    f_chip = font(REG, 32)
    capsule(d, W // 2, 200, 520, 96, eq=True)
    d.text((W // 2, 420), "Get Trisle", font=f_h, fill=WHITE, anchor="mm")
    d.text((W // 2, 530), "€5.99 once — yours forever.", font=f_sub, fill=BODY, anchor="mm")
    labels = ["7-day easy refunds", "100% on-device", "No ads · no tracking", "Android 7.0+"]
    gap, pad = 26, 22
    widths = []
    for t in labels:
        bb = d.textbbox((0, 0), t, font=f_chip)
        widths.append(bb[2] - bb[0] + pad * 2)
    total = sum(widths) + gap * (len(labels) - 1)
    x = (W - total) / 2
    for t, cw in zip(labels, widths):
        chip(d, x, 660, t, f_chip)
        x += cw + gap
    d.text((W // 2, 810), "trisle-app.github.io/Trisle_Website", font=font(REG, 30),
           fill=MUTED, anchor="mm")
    img.save(f"{OUT}/06-cta.png")

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    img1_hook(); img2_problem(); img3_solution()
    img4_activities(); img5_triple(); img6_cta()
    for f in sorted(os.listdir(OUT)):
        if f.endswith(".png"):
            im = Image.open(f"{OUT}/{f}")
            print(f, im.size, f"{os.path.getsize(f'{OUT}/{f}')//1024} KiB")
