import json
import os
import sys

# Add current folder to path
sys.path.append(os.path.dirname(__file__))

from builder_bai19_21 import get_assignments_19_to_21
from builder_bai22_25 import get_assignments_22_to_25
from builder_bai26_28 import get_assignments_26_to_28
from builder_bai29_31 import get_assignments_29_to_31

def assemble():
    # 1. Read existing seedData.ts to get header and footer
    seed_path = os.path.join(os.path.dirname(__file__), "..", "src", "services", "seedData.ts")
    with open(seed_path, "r", encoding="utf-8") as f:
        content = f.read()

    lines = content.splitlines()

    # Find boundaries
    # start line: export const INITIAL_ASSIGNMENTS: Assignment[] = [
    start_idx = -1
    for i, line in enumerate(lines):
        if "export const INITIAL_ASSIGNMENTS: Assignment[] = [" in line:
            start_idx = i
            break

    end_idx = -1
    for i in range(start_idx, len(lines)):
        if lines[i].strip() == "];":
            end_idx = i
            break

    print(f"Header lines: 0 to {start_idx}")
    print(f"Footer lines: {end_idx} to {len(lines)}")

    header = "\n".join(lines[:start_idx + 1])
    footer = "\n".join(lines[end_idx:])

    # Parse the existing 15 assignments (16, 17, 18)
    existing_slice = "[" + "\n".join(lines[start_idx + 1:end_idx]).rstrip()
    if existing_slice.endswith(","):
        existing_slice = existing_slice[:-1]
    existing_slice += "]"
    existing_data = json.loads(existing_slice)

    # Filter to only bai_16, bai_17, bai_18
    b16_18 = [a for a in existing_data if a["lessonId"] in ("bai_16", "bai_17", "bai_18")]
    print(f"Loaded {len(b16_18)} existing assignments for Bài 16, 17, 18.")

    # 2. Get all assignments from 19 to 31
    asgn_19_21 = get_assignments_19_to_21()
    asgn_22_25 = get_assignments_22_to_25()
    asgn_26_28 = get_assignments_26_to_28()
    asgn_29_31 = get_assignments_29_to_31()

    all_assignments = b16_18 + asgn_19_21 + asgn_22_25 + asgn_26_28 + asgn_29_31
    print(f"Total assembled assignments: {len(all_assignments)}")

    # 3. Check duplicate IDs
    ids = [a["id"] for a in all_assignments]
    if len(ids) != len(set(ids)):
        from collections import Counter
        duplicates = [k for k, v in Counter(ids).items() if v > 1]
        raise ValueError(f"Duplicate assignment IDs: {duplicates}")

    # 4. Format JSON with indent=2
    asgn_json = json.dumps(all_assignments, ensure_ascii=False, indent=2)
    # Strip opening '[' and closing ']' since header has '[' and footer has '];'
    inner_json = asgn_json.strip()
    if inner_json.startswith("["):
        inner_json = inner_json[1:].lstrip()
    if inner_json.endswith("]"):
        inner_json = inner_json[:-1].rstrip()

    # Indent inner lines by 2 spaces
    # json.dumps with indent=2 already indents contents by 2 spaces!
    new_content = header + "\n" + inner_json + "\n" + footer

    with open(seed_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"Successfully wrote {len(all_assignments)} assignments to {seed_path}!")

    # 5. Bump cache key in firestoreService.ts
    fs_path = os.path.join(os.path.dirname(__file__), "..", "src", "services", "firestoreService.ts")
    with open(fs_path, "r", encoding="utf-8") as f:
        fs_content = f.read()

    if "chroma_py_assignments_v11" in fs_content:
        fs_content = fs_content.replace("chroma_py_assignments_v11", "chroma_py_assignments_v12")
        with open(fs_path, "w", encoding="utf-8") as f:
            f.write(fs_content)
        print("Bumped LS_ASSIGNMENTS_KEY to chroma_py_assignments_v12 in firestoreService.ts")

if __name__ == "__main__":
    assemble()
