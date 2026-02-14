#!/usr/bin/env python3
"""
Split Code and Diagram Slides
-------------------------------
Separates code blocks and Mermaid diagrams from bullet points
to prevent slide overflow.

Usage:
    python3 scripts/split-code-diagrams.py <path/to/slides-data.json>
    python3 scripts/split-code-diagrams.py --all  # Process all presentations

For each slide with both content and code/diagram:
- Slide A: Title + bullet points (explanation)
- Slide B: Title + "(コード例)" or "(図解)" + code/diagram only
"""

import json
import sys
from pathlib import Path


def split_slide_content(slides):
    """Split slides with both content and code/diagram into separate slides."""
    new_slides = []
    split_count = 0

    for slide in slides:
        has_mermaid = 'mermaid' in slide and slide.get('mermaid')
        has_code = 'code' in slide and slide.get('code')
        has_content = 'content' in slide and len(slide.get('content', [])) > 0

        # If slide has code/diagram AND content, split it
        if (has_mermaid or has_code) and has_content:
            split_count += 1

            # Slide 1: Explanation only
            slide1 = {
                "title": slide['title'],
                "content": slide['content']
            }
            new_slides.append(slide1)

            # Slide 2: Code/diagram only
            if has_mermaid:
                # Mermaid diagram
                slide2 = {
                    "title": slide['title'] + "（図解）",
                    "content": [],
                    "mermaid": slide['mermaid']
                }
            elif has_code:
                # Code block
                slide2 = {
                    "title": slide['title'] + "（コード例）",
                    "content": [],
                    "code": slide['code'],
                    "codeLanguage": slide.get('codeLanguage', 'text')
                }

            new_slides.append(slide2)
        else:
            # No split needed
            new_slides.append(slide)

    return new_slides, split_count


def process_file(json_path):
    """Process a single slides-data.json file."""
    json_path = Path(json_path)

    if not json_path.exists():
        print(f"❌ File not found: {json_path}")
        return False

    print(f"📄 Processing: {json_path}")

    # Load JSON
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    original_count = len(data['slides'])

    # Split slides
    new_slides, split_count = split_slide_content(data['slides'])
    data['slides'] = new_slides

    # Save updated JSON
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"  ✅ Split {split_count} slides")
    print(f"  📊 {original_count} → {len(new_slides)} slides\n")

    return True


def process_all_presentations():
    """Process all presentations in docs/ directory."""
    docs_dir = Path(__file__).parent.parent / 'docs'

    if not docs_dir.exists():
        print(f"❌ docs/ directory not found")
        return

    print("🔍 Searching for presentations in docs/...\n")

    total = 0
    success = 0

    for presentation_dir in sorted(docs_dir.iterdir()):
        if not presentation_dir.is_dir():
            continue

        json_path = presentation_dir / 'slides-data.json'

        if not json_path.exists():
            continue

        total += 1
        if process_file(json_path):
            success += 1

    print(f"📊 Summary: {success}/{total} presentations processed")


def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python3 scripts/split-code-diagrams.py <path/to/slides-data.json>")
        print("  python3 scripts/split-code-diagrams.py --all")
        sys.exit(1)

    if sys.argv[1] == '--all':
        process_all_presentations()
    else:
        json_path = sys.argv[1]
        if process_file(json_path):
            sys.exit(0)
        else:
            sys.exit(1)


if __name__ == '__main__':
    main()
