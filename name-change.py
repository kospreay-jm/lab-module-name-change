import json
import os
from pathlib import Path

def update_module_name(sections_dir, new_module_name):
    """
    Cycles through folders in sections_dir and updates the 'module' field
    in each data.json file to the new_module_name.

    Args:
        sections_dir: Path to the sections directory
        new_module_name: The new module name to set
    """
    sections_path = Path(sections_dir)

    if not sections_path.exists():
        print(f"Error: Directory '{sections_dir}' does not exist")
        return

    subdirs = [d for d in sections_path.iterdir() if d.is_dir()]

    if not subdirs:
        print(f"No subdirectories found in '{sections_dir}'")
        return

    print(f"Found {len(subdirs)} section(s) to process...\n")

    updated_count = 0
    skipped_count = 0

    for subdir in subdirs:
        data_json_path = subdir / "map-questions" / "data.json"

        if data_json_path.exists():
            try:
                with open(data_json_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)

                old_module_name = data.get('module', 'N/A')

                data['module'] = new_module_name

                with open(data_json_path, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=4)

                print(f"  ✅ Updated {subdir.name} to {new_module_name}")

                updated_count += 1

            except json.JSONDecodeError as e:
                print(f"  Error decoding JSON in {data_json_path}: {e}\n")
                skipped_count += 1
            except Exception as e:
                print(f"  Error processing {data_json_path}: {e}\n")
                skipped_count += 1
        else:
            print(f"  Skipped: {subdir.name} (no data.json found at {data_json_path})\n")
            skipped_count += 1

    print("=" * 50)
    print(f"Summary:")
    print(f"  Files updated: {updated_count}")
    print(f"  Files skipped: {skipped_count}")
    print("=" * 50)

if __name__ == "__main__":
    script_dir = Path(__file__).parent
    sections_directory = script_dir / "sections"

    new_module_name = "new name here"

    update_module_name(sections_directory, new_module_name)
