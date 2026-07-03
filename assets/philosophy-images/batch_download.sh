#!/bin/bash
# Batch download and resize images for philosophy cards
set -e
DIR="/Users/ruishengzhang/Documents/GitHub/monkren designer/assets/philosophy-images"
API="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image"
SIZE="square_hd"

# Function to download, resize, and save
download_and_resize() {
    local file="$1"
    local prompt="$2"
    local filepath="$DIR/$file"
    
    if [ -f "$filepath" ] && [ $(stat -f%z "$filepath") -gt 1000 ]; then
        echo "SKIP: $file (exists)"
        return
    fi
    
    echo "DOWNLOADING: $file..."
    local encoded=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$prompt'))")
    local tmp="/tmp/philo_$$.jpg"
    
    curl -sL -o "$tmp" "$API?prompt=$encoded&image_size=$SIZE" 2>&1
    
    if [ -f "$tmp" ] && [ $(stat -f%z "$tmp") -gt 1000 ]; then
        sips -z 240 240 "$tmp" --out "$filepath" > /dev/null 2>&1
        echo "  -> Saved: $(stat -f%z "$filepath") bytes, $(sips -g pixelWidth -g pixelHeight "$filepath" 2>/dev/null | grep pixel)"
        rm "$tmp"
    else
        echo "  -> FAILED"
    fi
    sleep 1
}

# 13 images
download_and_resize "54-github-copilot.jpg" "GitHub Copilot AI pair programming interface, dark code editor with AI suggestions, modern developer tool, minimalist dark theme, high contrast"
download_and_resize "55-replit-agent.jpg" "Replit Agent AI coding interface, conversational development, browser IDE with chat, modern web app builder, clean UI"
download_and_resize "56-perplexity.jpg" "Perplexity AI search engine interface, answer engine with citations, structured search results, modern knowledge tool, clean card layout"
download_and_resize "58-linear.jpg" "Linear app project management dark theme interface, issue tracker, keyboard-first design, minimalist developer tool, kanban board"
download_and_resize "59-vercel.jpg" "Vercel deployment platform dashboard, dark monochrome interface, deployment status, developer tool, geometric layout, infrastructure UI"
download_and_resize "60-raycast.jpg" "Raycast macOS launcher command palette, keyboard-first productivity tool, floating search bar, minimalist app, dark theme"
download_and_resize "61-spatial-design.jpg" "Apple Vision Pro spatial computing interface, floating 3D windows in space, eye tracking gestures, futuristic AR glass morphism"
download_and_resize "62-ai-native-design.jpg" "AI-native product design concept, artificial intelligence powered interface, generative UI, modern AI application, clean tech aesthetic"
download_and_resize "63-calm-tech.jpg" "Calm technology ambient design, minimalist notification interface, peaceful digital experience, subtle information display, non-intrusive"
download_and_resize "64-design-engineering.jpg" "Design engineering integration, designer developer collaboration, code and design merged, Figma to code workflow, design system"
download_and_resize "66-swiss-design.jpg" "Swiss International Typographic Style poster, geometric grid layout, Helvetica typography, asymmetric composition, red black white, Josef Muller Brockmann"
download_and_resize "67-vignelli.jpg" "Massimo Vignelli modernism design, New York subway map style, geometric typography, minimalist graphic design, Helvetica bold, systematic"
download_and_resize "68-wim-crouwel.jpg" "Wim Crouwel pixel typography, experimental grid-based font design, New Alphabet style, geometric letterforms, digital era type, modular grid"

echo "ALL DONE"