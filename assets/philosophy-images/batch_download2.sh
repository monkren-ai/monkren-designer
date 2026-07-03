#!/bin/bash
# Batch download and resize 12 new images for expanded cards (#69-80)
set -e
DIR="/Users/ruishengzhang/Documents/GitHub/monkren designer/assets/philosophy-images"
API="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image"
SIZE="square_hd"

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
    local tmp="/tmp/philo2_$$.jpg"
    
    curl -sL -o "$tmp" "$API?prompt=$encoded&image_size=$SIZE" 2>&1
    
    if [ -f "$tmp" ] && [ $(stat -f%z "$tmp") -gt 1000 ]; then
        sips -z 240 240 "$tmp" --out "$filepath" > /dev/null 2>&1
        echo "  -> Saved: $(stat -f%z "$filepath") bytes"
        rm "$tmp"
    else
        echo "  -> FAILED"
    fi
    sleep 1
}

# AI人机共创派 extension
download_and_resize "69-claude-artifacts.jpg" "Claude Artifacts AI generation interface, real-time preview panel, code and design side by side, modern AI collaboration tool, clean workspace"
download_and_resize "70-v0-vercel.jpg" "v0 by Vercel AI generated UI design, prompt to component interface, React component preview, modern design tool, generative UI"
download_and_resize "71-devin.jpg" "Devin AI agent progress visualization, autonomous coding dashboard, task execution timeline, trust design interface, AI workflow"
download_and_resize "72-chatgpt-canvas.jpg" "ChatGPT Canvas multimodal collaboration, text code image side by side, AI workspace interface, modern design tool"

# 2026趋势派 extension
download_and_resize "73-agentic-ux.jpg" "Agentic UX design concept, AI agent supervision interface, command and confirm paradigm, futuristic interaction design, AI oversight dashboard"
download_and_resize "74-ai-generated-ui.jpg" "AI generated UI design curator, design quality review interface, AI output screening, modern design tool, quality gate"
download_and_resize "75-ethical-design.jpg" "Ethical AI design concept, transparency report interface, bias detection dashboard, EU AI Act compliance, responsible design"
download_and_resize "76-sustainable-design.jpg" "Sustainable digital design, low carbon web interface, dark mode eco design, green hosting concept, environmental responsibility"

# 经典设计派 extension
download_and_resize "77-de-stijl.jpg" "De Stijl Mondrian style, red yellow blue geometric grid, black white lines, abstract composition, primary colors, modern art"
download_and_resize "78-brutalist-web.jpg" "Brutalist web design, raw HTML structure, system fonts, no decoration, honest aesthetic, anti-design, bare interface"
download_and_resize "79-ikko-tanaka.jpg" "Ikko Tanaka Japanese graphic design, traditional and modern fusion, geometric abstract, Noh mask style, minimalist poster"
download_and_resize "80-ulmer-schule.jpg" "Ulm School HfG design methodology, German rationalism, systematic design, Braun Dieter Rams style, functional minimalism"

echo "ALL DONE"