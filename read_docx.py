import docx
import os
import sys

# Ensure output is UTF-8
if sys.platform == "win32":
    import codecs
    sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

def read_docx(file_path):
    doc = docx.Document(file_path)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return '\n'.join(full_text)

file_path = r'c:\Users\aimpr\Downloads\MiniCourseSubscriptionApp\Build and Host a Mini Course Subscription Application (Black-Friday Edition).docx'
if os.path.exists(file_path):
    content = read_docx(file_path)
    # Write to file with utf-8 encoding to avoid console issues
    with open('requirements.txt', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Content written to requirements.txt")
else:
    print(f"File not found: {file_path}")
