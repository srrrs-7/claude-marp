#!/usr/bin/env python3
"""
Update Mermaid Styles in Config Files
--------------------------------------
Adds CSS to fit Mermaid diagrams within slide dimensions.

Usage:
    python3 scripts/update-mermaid-styles.py
"""

import re
from pathlib import Path


MERMAID_CSS = """
    /* Mermaid図解をスライドに収める */
    section .mermaid {
      display: flex;
      justify-content: center;
      align-items: center;
      max-height: 70vh;
      max-width: 100%;
    }

    section .mermaid svg {
      max-width: 100%;
      max-height: 70vh;
      height: auto;
      width: auto;
    }"""


def update_config_file(config_path):
    """Update a single slides.config.yaml file."""
    print(f"📄 Processing: {config_path}")

    with open(config_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if Mermaid styles already exist
    if 'section .mermaid' in content:
        print(f"  ⏭️  Already updated\n")
        return False

    # Find the style section (either under marp: or top-level)
    style_match = re.search(r'((?:marp:\s*\n.*?)?style:\s*\|)(.*?)(?=\n\S|\Z)', content, re.DOTALL)

    if not style_match:
        print(f"  ⚠️  No style section found\n")
        return False

    # Insert Mermaid CSS after existing styles
    existing_style = style_match.group(2)
    new_style = existing_style.rstrip() + MERMAID_CSS

    # Replace in content
    new_content = content[:style_match.start(2)] + new_style + content[style_match.end(2):]

    # Save updated config
    with open(config_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"  ✅ Updated with Mermaid styles\n")
    return True


def main():
    docs_dir = Path(__file__).parent.parent / 'docs'

    if not docs_dir.exists():
        print(f"❌ docs/ directory not found")
        return

    print("🔍 Searching for config files in docs/...\n")

    total = 0
    updated = 0

    for presentation_dir in sorted(docs_dir.iterdir()):
        if not presentation_dir.is_dir():
            continue

        config_path = presentation_dir / 'slides.config.yaml'

        if not config_path.exists():
            continue

        total += 1
        if update_config_file(config_path):
            updated += 1

    print(f"📊 Summary: {updated}/{total} configs updated")


if __name__ == '__main__':
    main()
