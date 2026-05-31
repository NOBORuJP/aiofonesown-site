#!/usr/bin/env python3
from pathlib import Path
import re
import shutil
import argparse

EN_URL = "https://noborikuta.gumroad.com/l/aiofonesown-early-access"
JA_URL = "https://noborikuta.gumroad.com/l/sodateru-ai-early-access"

TEXT_EXTS = {
    ".html", ".htm", ".md", ".mdx", ".astro", ".jsx", ".tsx", ".js", ".ts",
    ".json", ".yml", ".yaml", ".txt", ".css"
}

def is_text_file(p: Path) -> bool:
    return p.suffix.lower() in TEXT_EXTS and all(part not in {
        ".git", "node_modules", "dist", ".next", "build", ".cache"
    } for part in p.parts)

def fix_text(text: str, rel: str) -> str:
    original = text

    # Fix bare / wrong Gumroad URLs.
    replacements = {
        "https://gumroad.com/l/aiofonesown-early-access": EN_URL,
        "http://gumroad.com/l/aiofonesown-early-access": EN_URL,
        "gumroad.com/l/aiofonesown-early-access": EN_URL,
        "https://gumroad.com/l/sodateru-ai-early-access": JA_URL,
        "http://gumroad.com/l/sodateru-ai-early-access": JA_URL,
        "gumroad.com/l/sodateru-ai-early-access": JA_URL,
        "https://noborikuta.gumroad.com/l/esohp": EN_URL,
        "https://noborikuta.gumroad.com/l/ai-of-ones-own-early-access": EN_URL,
        "https://noborikuta.gumroad.com/l/english-early-access": EN_URL,
    }
    for old, new in replacements.items():
        text = text.replace(old, new)

    # Repair accidental double-prefix if already introduced.
    text = text.replace("https://noborikuta.https://noborikuta.gumroad.com", "https://noborikuta.gumroad.com")
    text = text.replace("https://https://noborikuta.gumroad.com", "https://noborikuta.gumroad.com")

    # Specific English update page correction.
    if "english-early-access-gumroad-release" in rel:
        text = text.replace(JA_URL, EN_URL)
        text = text.replace("May 31, 2026", "May 28, 2026")
        text = text.replace("2026-05-31", "2026-05-28")
        text = text.replace("Japanese edition", "English edition")

    # Remove common Author nav links only.
    author_patterns = [
        r'<a\s+[^>]*href=["\']\/author\/?["\'][^>]*>\s*Author\s*<\/a>\s*',
        r'<a\s+[^>]*href=["\']\/author\/?["\'][^>]*>\s*著者\s*<\/a>\s*',
        r'\[Author\]\(\/author\/?\)\s*',
        r'\[著者\]\(\/author\/?\)\s*',
        r'\{\s*label:\s*["\']Author["\']\s*,\s*href:\s*["\']\/author\/?["\']\s*\},?\s*',
        r'\{\s*href:\s*["\']\/author\/?["\']\s*,\s*label:\s*["\']Author["\']\s*\},?\s*',
    ]
    for pat in author_patterns:
        text = re.sub(pat, "", text, flags=re.IGNORECASE | re.MULTILINE)

    return text

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="Apply changes. Without this, dry-run only.")
    args = ap.parse_args()

    changed = []
    for p in Path(".").rglob("*"):
        if not p.is_file() or not is_text_file(p):
            continue
        try:
            old = p.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        new = fix_text(old, p.as_posix())
        if new != old:
            changed.append(p.as_posix())
            if args.apply:
                backup = p.with_suffix(p.suffix + ".bak_hotfix_v4")
                if not backup.exists():
                    backup.write_text(old, encoding="utf-8")
                p.write_text(new, encoding="utf-8")

    print("Changed files:" if args.apply else "Would change files:")
    for c in changed:
        print(" -", c)
    if not changed:
        print(" - none")

    if not args.apply:
        print("\nDry-run only. Run with --apply to modify files.")

if __name__ == "__main__":
    main()
