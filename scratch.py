import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # rgba(199,204,209,...) is silver
    content = re.sub(r'rgba\(199,204,209,0\.(06|08|1|15|2|3|25)\)', "'#E5E3DC'", content) # in jsx
    content = re.sub(r'rgba\(199,204,209,0\.([0-9]+)\)', r'rgba(107,107,104,0.\1)', content)
    
    # rgba(255,138,61,...) is amber
    content = re.sub(r'rgba\(255,138,61,0\.([0-9]+)\)', r'rgba(200,96,46,0.\1)', content)

    # rgba(21,23,28,...) is graphite overlay
    content = re.sub(r'rgba\(21,23,28,0\.([0-9]+)\)', r'rgba(250,250,248,0.\1)', content)

    # #FF8A3D -> #C8602E
    content = content.replace('#FF8A3D', '#C8602E')

    # text-transform: 'uppercase'
    content = content.replace("textTransform: 'uppercase',", "")
    content = content.replace("textTransform: 'uppercase'", "")

    with open(filepath, 'w') as f:
        f.write(content)

def main():
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith('.jsx') or file.endswith('.css'):
                process_file(os.path.join(root, file))

if __name__ == '__main__':
    main()
