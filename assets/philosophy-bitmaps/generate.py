#!/usr/bin/env python3
"""
Generate 10 school-level iconic PNG bitmaps (120x120) for philosophy cards.
Monochrome (black background, white foreground), 1px stroke design philosophy.
"""
from PIL import Image, ImageDraw
import os

SIZE = 120
BG = (0, 0, 0)  # black
FG = (255, 255, 255)  # white
OUT_DIR = "assets/philosophy-bitmaps"


def base_image():
    return Image.new("RGB", (SIZE, SIZE), BG)


def draw_grid_data(d):
    """01 信息建筑派: 3x3 细线网格 + 5 个不同尺寸圆点"""
    img = base_image()
    d = ImageDraw.Draw(img)
    # 3x3 grid
    cell = SIZE // 3
    for i in range(1, 3):
        d.line([(i * cell, 8), (i * cell, SIZE - 8)], fill=FG, width=1)
        d.line([(8, i * cell), (SIZE - 8, i * cell)], fill=FG, width=1)
    # data points
    pts = [(20, 20, 3), (60, 20, 5), (100, 20, 2), (20, 60, 4), (60, 60, 6)]
    for x, y, r in pts:
        d.ellipse([x - r, y - r, x + r, y + r], fill=FG)
    return img


def draw_flow_arcs(d_unused):
    """02 运动诗学派: 3 条 sin 曲线叠加 + 终点箭头"""
    import math
    img = base_image()
    d = ImageDraw.Draw(img)
    # 3 sin curves
    for offset in [20, 50, 80]:
        pts = []
        for x in range(10, 110, 2):
            y = offset + int(15 * math.sin((x - 10) * 0.15))
            pts.append((x, y))
        d.line(pts, fill=FG, width=1)
    # arrow at end
    d.polygon([(108, 56), (114, 60), (108, 64)], fill=FG)
    return img


def draw_thick_lines(d_unused):
    """03 极简主义派: 6 条不同粗细的横线"""
    img = base_image()
    d = ImageDraw.Draw(img)
    widths = [20, 32, 16, 28, 12, 24]
    for i, w in enumerate(widths):
        y = 14 + i * 16
        d.rectangle([20, y, 20 + w, y + 2], fill=FG)
    return img


def draw_pixel_matrix(d_unused):
    """04 实验先锋派: 8x8 黑白像素矩阵, 3-4 个黑点(已反转，白色块代表像素)"""
    img = base_image()
    d = ImageDraw.Draw(img)
    cell = SIZE // 8
    # Sparse filled cells to suggest pixel art
    pattern = [
        (1, 1), (2, 2), (4, 1), (5, 3), (1, 5), (3, 6),
        (6, 2), (6, 5), (5, 6), (2, 4), (4, 5), (7, 7)
    ]
    for r, c in pattern:
        x0 = c * cell + 2
        y0 = r * cell + 2
        d.rectangle([x0, y0, x0 + cell - 4, y0 + cell - 4], fill=FG)
    return img


def draw_zen_circle(d_unused):
    """05 东方哲学派: 大圆 + 一道横切线"""
    img = base_image()
    d = ImageDraw.Draw(img)
    d.ellipse([14, 14, 106, 106], outline=FG, width=2)
    # horizontal line through center
    d.line([(8, 60), (112, 60)], fill=FG, width=1)
    return img


def draw_organic_curves(d_unused):
    """06 野蛮生长派: 不规则粗细曲线 + 3 个手绘点"""
    import math
    img = base_image()
    d = ImageDraw.Draw(img)
    # organic curve
    pts = []
    for i, x in enumerate(range(10, 115, 3)):
        y = 60 + int(30 * math.sin(i * 0.4)) + int(10 * math.cos(i * 0.8))
        pts.append((x, y))
    d.line(pts, fill=FG, width=2)
    # hand-drawn points
    for cx, cy in [(20, 60), (60, 35), (100, 60)]:
        d.ellipse([cx - 4, cy - 4, cx + 4, cy + 4], fill=FG)
    # secondary curve
    pts2 = []
    for i, x in enumerate(range(15, 105, 4)):
        y = 90 + int(15 * math.cos(i * 0.5))
        pts2.append((x, y))
    d.line(pts2, fill=FG, width=1)
    return img


def draw_memphis_collage(d_unused):
    """07 后现代狂欢派: 3-4 个重叠几何 + 不同填充"""
    img = base_image()
    d = ImageDraw.Draw(img)
    # filled triangle
    d.polygon([(15, 20), (45, 20), (30, 50)], fill=FG)
    # outlined circle
    d.ellipse([55, 15, 95, 55], outline=FG, width=2)
    # filled square
    d.rectangle([20, 70, 60, 105], fill=FG)
    # outlined triangle
    d.polygon([(75, 70), (105, 70), (90, 105)], outline=FG, width=2)
    # small filled dot
    d.ellipse([88, 35, 100, 47], fill=FG)
    return img


def draw_wave_layers(d_unused):
    """08 有机仿生派: 多层 sine wave + 节点圆"""
    import math
    img = base_image()
    d = ImageDraw.Draw(img)
    for layer in range(3):
        pts = []
        amp = 12 + layer * 4
        y_base = 30 + layer * 25
        for x in range(8, 116, 2):
            y = y_base + int(amp * math.sin((x - 8) * 0.12))
            pts.append((x, y))
        d.line(pts, fill=FG, width=1)
    # node circles at peaks
    for cx, cy in [(30, 18), (60, 30), (90, 42)]:
        d.ellipse([cx - 3, cy - 3, cx + 3, cy + 3], outline=FG, width=1)
    return img


def draw_retro_triangle(d_unused):
    """09 复古未来派: 嵌套等边三角 + 中心圆"""
    img = base_image()
    d = ImageDraw.Draw(img)
    # outer triangle
    d.polygon([(60, 10), (110, 100), (10, 100)], outline=FG, width=2)
    # middle triangle
    d.polygon([(60, 35), (90, 95), (30, 95)], outline=FG, width=1)
    # center filled triangle
    d.polygon([(60, 55), (75, 90), (45, 90)], fill=FG)
    # center dot circle
    d.ellipse([56, 65, 64, 73], fill=BG)
    return img


def draw_dense_dots(d_unused):
    """10 极繁主义派: 5x5 圆点 + 3-4 个黑点"""
    img = base_image()
    d = ImageDraw.Draw(img)
    cell = SIZE // 5
    pattern = [
        (0, 0, True), (0, 1, False), (0, 2, True), (0, 3, False), (0, 4, True),
        (1, 0, False), (1, 1, True), (1, 2, False), (1, 3, True), (1, 4, False),
        (2, 0, True), (2, 1, False), (2, 2, True), (2, 3, False), (2, 4, True),
        (3, 0, False), (3, 1, True), (3, 2, False), (3, 3, True), (3, 4, False),
        (4, 0, True), (4, 1, False), (4, 2, True), (4, 3, False), (4, 4, True),
    ]
    for r, c, filled in pattern:
        cx = c * cell + cell // 2
        cy = r * cell + cell // 2
        r_outer = cell // 3
        if filled:
            d.ellipse([cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer], fill=FG)
        else:
            d.ellipse([cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer], outline=FG, width=1)
    return img


GENERATORS = {
    "01": ("信息建筑派", draw_grid_data),
    "02": ("运动诗学派", draw_flow_arcs),
    "03": ("极简主义派", draw_thick_lines),
    "04": ("实验先锋派", draw_pixel_matrix),
    "05": ("东方哲学派", draw_zen_circle),
    "06": ("野蛮生长派", draw_organic_curves),
    "07": ("后现代狂欢派", draw_memphis_collage),
    "08": ("有机仿生派", draw_wave_layers),
    "09": ("复古未来派", draw_retro_triangle),
    "10": ("极繁主义派", draw_dense_dots),
}


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for code, (name, gen) in GENERATORS.items():
        img = gen(None)
        out_path = os.path.join(OUT_DIR, f"{code}.png")
        img.save(out_path, "PNG", optimize=True)
        size = os.path.getsize(out_path)
        print(f"  {code}.png  {name:8}  {size:>5} bytes")


if __name__ == "__main__":
    main()
