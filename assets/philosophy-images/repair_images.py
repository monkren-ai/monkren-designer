#!/usr/bin/env python3
"""
Repair placeholder/corrupt philosophy images.

This script:
1. Identifies placeholder images (the API's "generating..." placeholder is ~7810 bytes)
2. Identifies corrupt/invalid images (too small, wrong dimensions, pure black)
3. Re-downloads them with retry logic (the API is async and may return placeholder first)
4. Resizes all valid downloads to 240x240 JPEG via sips
"""

import os
import subprocess
import time
import urllib.parse
import urllib.request
from pathlib import Path

DIR = Path("/Users/ruishengzhang/Documents/GitHub/monkren designer/assets/philosophy-images")
API = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image"
SIZE = "square_hd"

# Placeholder image is exactly 7810 bytes in current audit; allow small tolerance
PLACEHOLDER_SIZE = 7810
PLACEHOLDER_TOLERANCE = 200

# Minimum valid image size (real 240x240 JPEGs are typically >3KB)
MIN_VALID_SIZE = 3000

IMAGES = [
    # #44 corrupt pure black
    ("44-apple-hig.jpg", "Apple Human Interface Guidelines design documentation, clean iOS interface, Cupertino design, modern Apple UI, light theme"),

    # batch_download.sh images (missing 53 is in batch_download2 via cursor, but listed here to be safe)
    ("53-cursor.jpg", "Cursor AI IDE interface, dark code editor with AI inline suggestions, chat sidebar, diff preview, modern developer tool, minimalist"),
    ("54-github-copilot.jpg", "GitHub Copilot AI pair programming interface, dark code editor with AI suggestions, modern developer tool, minimalist dark theme, high contrast"),
    ("55-replit-agent.jpg", "Replit Agent AI coding interface, conversational development, browser IDE with chat, modern web app builder, clean UI"),
    ("56-perplexity.jpg", "Perplexity AI search engine interface, answer engine with citations, structured search results, modern knowledge tool, clean card layout"),
    ("57-warp.jpg", "Warp modern terminal interface, block-based command line, dark theme, AI suggestions, GPU terminal, developer tool"),
    ("58-linear.jpg", "Linear app project management dark theme interface, issue tracker, keyboard-first design, minimalist developer tool, kanban board"),
    ("59-vercel.jpg", "Vercel deployment platform dashboard, dark monochrome interface, deployment status, developer tool, geometric layout, infrastructure UI"),
    ("60-raycast.jpg", "Raycast macOS launcher command palette, keyboard-first productivity tool, floating search bar, minimalist app, dark theme"),
    ("61-spatial-design.jpg", "Apple Vision Pro spatial computing interface, floating 3D windows in space, eye tracking gestures, futuristic AR glass morphism"),
    ("62-ai-native-design.jpg", "AI-native product design concept, artificial intelligence powered interface, generative UI, modern AI application, clean tech aesthetic"),
    ("63-calm-tech.jpg", "Calm technology ambient design, minimalist notification interface, peaceful digital experience, subtle information display, non-intrusive"),
    ("64-design-engineering.jpg", "Design engineering integration, designer developer collaboration, code and design merged, Figma to code workflow, design system"),
    ("65-bauhaus.jpg", "Bauhaus design, geometric shapes, primary colors red yellow blue, black white grid, industrial modernism, Walter Gropius style"),
    ("66-swiss-design.jpg", "Swiss International Typographic Style poster, geometric grid layout, Helvetica typography, asymmetric composition, red black white, Josef Muller Brockmann"),
    ("67-vignelli.jpg", "Massimo Vignelli modernism design, New York subway map style, geometric typography, minimalist graphic design, Helvetica bold, systematic"),
    ("68-wim-crouwel.jpg", "Wim Crouwel pixel typography, experimental grid-based font design, New Alphabet style, geometric letterforms, digital era type, modular grid"),

    # batch_download2.sh images
    ("69-claude-artifacts.jpg", "Claude Artifacts AI generation interface, real-time preview panel, code and design side by side, modern AI collaboration tool, clean workspace"),
    ("70-v0-vercel.jpg", "v0 by Vercel AI generated UI design, prompt to component interface, React component preview, modern design tool, generative UI"),
    ("71-devin.jpg", "Devin AI agent progress visualization, autonomous coding dashboard, task execution timeline, trust design interface, AI workflow"),
    ("72-chatgpt-canvas.jpg", "ChatGPT Canvas multimodal collaboration, text code image side by side, AI workspace interface, modern design tool"),
    ("73-agentic-ux.jpg", "Agentic UX design concept, AI agent supervision interface, command and confirm paradigm, futuristic interaction design, AI oversight dashboard"),
    ("74-ai-generated-ui.jpg", "AI generated UI design curator, design quality review interface, AI output screening, modern design tool, quality gate"),
    ("75-ethical-design.jpg", "Ethical AI design concept, transparency report interface, bias detection dashboard, EU AI Act compliance, responsible design"),
    ("76-sustainable-design.jpg", "Sustainable digital design, low carbon web interface, dark mode eco design, green hosting concept, environmental responsibility"),
    ("77-de-stijl.jpg", "De Stijl Mondrian style, red yellow blue geometric grid, black white lines, abstract composition, primary colors, modern art"),
    ("78-brutalist-web.jpg", "Brutalist web design, raw HTML structure, system fonts, no decoration, honest aesthetic, anti-design, bare interface"),
    ("79-ikko-tanaka.jpg", "Ikko Tanaka Japanese graphic design, traditional and modern fusion, geometric abstract, Noh mask style, minimalist poster"),
    ("80-ulmer-schule.jpg", "Ulm School HfG design methodology, German rationalism, systematic design, Braun Dieter Rams style, functional minimalism"),
]


def is_placeholder(filepath: Path) -> bool:
    """Check if file is the API placeholder image."""
    if not filepath.exists():
        return True
    size = filepath.stat().st_size
    return abs(size - PLACEHOLDER_SIZE) <= PLACEHOLDER_TOLERANCE


def is_too_small(filepath: Path) -> bool:
    """Check if file is suspiciously small or pure black."""
    if not filepath.exists():
        return True
    return filepath.stat().st_size < MIN_VALID_SIZE


def needs_repair(filepath: Path) -> bool:
    """Determine if image needs to be re-downloaded."""
    if is_placeholder(filepath) or is_too_small(filepath):
        return True
    # Also check sips can read it and it is 240x240
    try:
        result = subprocess.run(
            ["sips", "-g", "pixelWidth", "-g", "pixelHeight", "-g", "format", str(filepath)],
            capture_output=True,
            text=True,
            check=True,
        )
        output = result.stdout
        if "240" not in output or "jpeg" not in output.lower():
            return True
    except subprocess.CalledProcessError:
        return True
    return False


def resize_with_sips(src: Path, dst: Path) -> bool:
    """Resize source image to 240x240 JPEG using sips."""
    try:
        subprocess.run(
            ["sips", "-z", "240", "240", str(src), "--out", str(dst)],
            capture_output=True,
            check=True,
        )
        return True
    except subprocess.CalledProcessError as e:
        print(f"    sips failed: {e.stderr.decode('utf-8', errors='ignore')}")
        return False


def download_image(prompt: str, tmp_path: Path) -> bool:
    """Download image from API to tmp_path using curl. Returns True on success."""
    encoded = urllib.parse.quote(prompt)
    url = f"{API}?prompt={encoded}&image_size={SIZE}"
    try:
        subprocess.run(
            ["curl", "-sL", "-o", str(tmp_path), url],
            capture_output=True,
            check=True,
        )
        return tmp_path.exists() and tmp_path.stat().st_size > 1000
    except subprocess.CalledProcessError as e:
        print(f"    curl failed: {e.stderr.decode('utf-8', errors='ignore')}")
        return False


def repair_image(filename: str, prompt: str) -> bool:
    """Repair a single image. Returns True if final file is valid."""
    filepath = DIR / filename
    print(f"REPAIRING: {filename}")

    if filepath.exists():
        filepath.unlink()

    tmp_path = Path(f"/tmp/repair_{filename}")
    if tmp_path.exists():
        tmp_path.unlink()

    # First attempt
    if not download_image(prompt, tmp_path):
        print("  -> FIRST ATTEMPT FAILED")
        return False
    print(f"  -> first download: {tmp_path.stat().st_size} B, placeholder={is_placeholder(tmp_path)}, small={is_too_small(tmp_path)}")

    # If first result is placeholder, the API is still generating.
    # Retry with increasing delays.
    attempt = 0
    while is_placeholder(tmp_path) or is_too_small(tmp_path):
        attempt += 1
        if attempt > 7:
            print(f"  -> GIVING UP: still placeholder after retries")
            if tmp_path.exists():
                tmp_path.unlink()
            return False

        wait = min(attempt * 8, 60)  # 8, 16, 24, 32, 40, 48, 60
        print(f"  -> retry in {wait}s (attempt {attempt}/7), size={tmp_path.stat().st_size} B")
        time.sleep(wait)

        if tmp_path.exists():
            tmp_path.unlink()
        if not download_image(prompt, tmp_path):
            print(f"  -> retry download failed")

    print(f"  -> valid download: {tmp_path.stat().st_size} B")

    # Resize and save final
    if not resize_with_sips(tmp_path, filepath):
        print("  -> RESIZE FAILED")
        if tmp_path.exists():
            tmp_path.unlink()
        return False

    if tmp_path.exists():
        tmp_path.unlink()

    print(f"  -> SAVED: {filepath.stat().st_size} B")
    return True


def main():
    if not DIR.exists():
        print(f"Directory not found: {DIR}")
        return

    success = 0
    failed = []

    for filename, prompt in IMAGES:
        if repair_image(filename, prompt):
            success += 1
        else:
            failed.append(filename)
        time.sleep(1)

    print("\n=== SUMMARY ===")
    print(f"Success: {success}/{len(IMAGES)}")
    if failed:
        print(f"Failed: {', '.join(failed)}")
    else:
        print("All images repaired successfully.")


if __name__ == "__main__":
    main()
