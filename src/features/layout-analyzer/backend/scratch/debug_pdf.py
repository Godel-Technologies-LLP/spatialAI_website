import fitz
import math
import sys

def debug_pdf(path):
    doc = fitz.open(path)
    for i, page in enumerate(doc):
        print(f"--- Page {i} ---")
        print(f"Page rect: {page.rect}")
        drawings = page.get_drawings()
        print(f"Total drawings: {len(drawings)}")
        
        for idx, d in enumerate(drawings):
            fill = d.get("fill")
            rect = d.get("rect")
            items = d.get("items", [])
            print(f"Drawing {idx}: fill={fill}, rect={rect}, items={len(items)}")
        
        line_count = 0
        curve_count = 0
        for d in drawings:
            items = d.get("items", [])
            for item in items:
                if item[0] == "l": line_count += 1
                elif item[0] in ["c", "qu"]: curve_count += 1
        
        print(f"Lines: {line_count}")
        print(f"Curves: {curve_count}")
        
        text = page.get_text("text").strip()
        print(f"Text length: {len(text)}")
        
        images = page.get_images()
        print(f"Images: {len(images)}")

if __name__ == "__main__":
    debug_pdf(sys.argv[1])
