#!/usr/bin/env python3
"""Batch generate images for philosophy cards using text_to_image API."""
import urllib.request
import urllib.parse
import os
import time

API_URL = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image"
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

# 13 missing images with prompts
IMAGES = [
    {
        "file": "54-github-copilot.jpg",
        "prompt": "GitHub Copilot AI pair programming interface, dark code editor with AI suggestions panel, modern developer tool design, clean typography, minimalist dark theme, high contrast monochrome aesthetic",
        "size": "square_hd"
    },
    {
        "file": "55-replit-agent.jpg",
        "prompt": "Replit Agent AI coding interface, conversational development environment, browser-based IDE with chat panel, modern web app builder, clean UI design, minimalist workspace",
        "size": "square_hd"
    },
    {
        "file": "56-perplexity.jpg",
        "prompt": "Perplexity AI search engine interface, answer engine with citation sources, structured search results, modern knowledge tool design, clean card layout, information architecture",
        "size": "square_hd"
    },
    {
        "file": "58-linear.jpg",
        "prompt": "Linear app project management interface, dark theme issue tracker, keyboard-first design, minimalist developer tool, clean kanban board, modern software project UI",
        "size": "square_hd"
    },
    {
        "file": "59-vercel.jpg",
        "prompt": "Vercel deployment platform dashboard, dark monochrome interface, deployment status indicators, developer tool design, clean geometric layout, modern infrastructure UI",
        "size": "square_hd"
    },
    {
        "file": "60-raycast.jpg",
        "prompt": "Raycast macOS launcher interface, command palette design, keyboard-first productivity tool, floating search bar, minimalist macOS app, clean dark theme UI",
        "size": "square_hd"
    },
    {
        "file": "61-spatial-design.jpg",
        "prompt": "Apple Vision Pro spatial computing interface, floating 3D windows in space, eye tracking gestures, futuristic AR design, glass morphism UI, spatial operating system",
        "size": "square_hd"
    },
    {
        "file": "62-ai-native-design.jpg",
        "prompt": "AI-native product design concept, artificial intelligence powered interface, generative UI design, modern AI application design, futuristic product design concept, clean tech aesthetic",
        "size": "square_hd"
    },
    {
        "file": "63-calm-tech.jpg",
        "prompt": "Calm technology ambient design, minimalist notification interface, peaceful digital experience, subtle information display, non-intrusive technology, quiet computing aesthetic",
        "size": "square_hd"
    },
    {
        "file": "64-design-engineering.jpg",
        "prompt": "Design engineering integration, designer and developer collaboration, code and design merged, Figma to code workflow, design system components, modern design-development bridge",
        "size": "square_hd"
    },
    {
        "file": "66-swiss-design.jpg",
        "prompt": "Swiss International Typographic Style poster, geometric grid layout, Helvetica typography, asymmetric composition, red black white color scheme, minimalist graphic design, Josef Muller Brockmann style",
        "size": "square_hd"
    },
    {
        "file": "67-vignelli.jpg",
        "prompt": "Massimo Vignelli modernism design, New York subway map style, clean geometric typography, minimalist graphic design, Helvetica bold, systematic design language, modernist poster aesthetic",
        "size": "square_hd"
    },
    {
        "file": "68-wim-crouwel.jpg",
        "prompt": "Wim Crouwel pixel typography, experimental grid-based font design, New Alphabet style, geometric letterforms, digital era typography, modular grid system, avant-garde type design",
        "size": "square_hd"
    },
]

def download_image(url, filepath):
    """Download image from URL and save to filepath."""
    try:
        urllib.request.urlretrieve(url, filepath)
        return True
    except Exception as e:
        print(f"  Error downloading: {e}")
        return False

def generate_image(prompt, size="square_hd"):
    """Call text_to_image API and return the image URL."""
    encoded_prompt = urllib.parse.quote(prompt)
    url = f"{API_URL}?prompt={encoded_prompt}&image_size={size}"
    
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=120) as response:
            data = response.read()
            # The API returns the image directly
            return data
    except Exception as e:
        print(f"  API error: {e}")
        return None

def main():
    for i, img in enumerate(IMAGES):
        filepath = os.path.join(OUTPUT_DIR, img["file"])
        if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
            print(f"[{i+1}/{len(IMAGES)}] SKIP {img['file']} (already exists)")
            continue
            
        print(f"[{i+1}/{len(IMAGES)}] Generating {img['file']}...")
        print(f"  Prompt: {img['prompt'][:80]}...")
        
        image_data = generate_image(img["prompt"], img["size"])
        if image_data:
            with open(filepath, "wb") as f:
                f.write(image_data)
            size_kb = os.path.getsize(filepath) / 1024
            print(f"  Saved: {size_kb:.1f} KB")
        else:
            print(f"  FAILED to generate {img['file']}")
        
        # Rate limit
        time.sleep(1)
    
    print("\nDone! Now run: sips -z 240 240 <file> --out <file> for each image")

if __name__ == "__main__":
    main()