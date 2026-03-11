#!/usr/bin/env python3
"""
Split slides with 8+ bullet points into 2 slides to prevent overflow.
"""
import json
import sys
from pathlib import Path

MAX_BULLETS = 7

def split_bullets(slides):
    new_slides = []
    split_count = 0
    for slide in slides:
        content = slide.get("content", [])
        # Only split plain bullet items (not table rows or image directives)
        bullets = [c for c in content if not c.startswith("|") and not c.startswith("![")]
        non_bullets = [c for c in content if c.startswith("|") or c.startswith("![")]
        
        if len(bullets) > MAX_BULLETS:
            split_count += 1
            mid = len(bullets) // 2
            # Slide 1: first half
            slide1 = dict(slide)
            slide1["content"] = bullets[:mid] + non_bullets
            slide1["title"] = slide["title"] + "（1/2）"
            new_slides.append(slide1)
            # Slide 2: second half
            slide2 = dict(slide)
            slide2["content"] = bullets[mid:] + non_bullets
            slide2["title"] = slide["title"] + "（2/2）"
            new_slides.append(slide2)
        else:
            new_slides.append(slide)
    return new_slides, split_count

def process_file(path):
    path = Path(path)
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    original = len(data["slides"])
    data["slides"], split_count = split_bullets(data["slides"])
    if split_count > 0:
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ {path.parent.name}: split {split_count} slides ({original} → {len(data['slides'])})")
    return split_count

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--all":
        total = 0
        for p in sorted(Path("docs").glob("**/slides-data.json")):
            total += process_file(p)
        print(f"\n📊 Total: {total} slides split")
    elif len(sys.argv) > 1:
        process_file(sys.argv[1])
