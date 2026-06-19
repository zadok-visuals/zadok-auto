import os

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Fix the double single quotes like ''#E5E3DC'' inside JSX
    fixed = content.replace("''#E5E3DC''", "'#E5E3DC'")

    if fixed != content:
        with open(filepath, 'w') as f:
            f.write(fixed)

def main():
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith('.jsx'):
                fix_file(os.path.join(root, file))

if __name__ == '__main__':
    main()
