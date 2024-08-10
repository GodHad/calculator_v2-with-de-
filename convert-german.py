import os
import bs4
import re
import json

def update_resource_paths(html_content, lang_code):
    """Update resource paths to include the language code."""
    soup = bs4.BeautifulSoup(html_content, 'html.parser')
    
    # Update 'src' attributes in <script> tags and other relevant tags
    # for tag in soup.find_all(src=True):
    #     src = tag['src']
    #     if '/assets/js/calculator/' in src:
    #         new_src = re.sub(r'.(/assets/js/calculator/[^/]+)', fr'\1/{lang_code}', src)
    #         tag['src'] = new_src
    #         print(f"Updated script src: {src} to {new_src}")

    # # Update 'href' attributes in <link> tags
    # for tag in soup.find_all(href=True):
    #     href = tag['href']
    #     if '/assets/js/calculator/' in href:
    #         new_href = re.sub(r'.(/assets/js/calculator/[^/]+)', fr'\1/{lang_code}', href)
    #         tag['href'] = new_href
    #         print(f"Updated link href: {href} to {new_href}")

    return str(soup.prettify())

def process_html_files(calculators, lang_code):
    """Process all HTML files in the directories specified by calculators."""
    for calculator in calculators:
        folder_name = calculator['uri'].strip('/').replace('/', '-')  # Adjust based on your folder naming
        folder_path = os.path.join(folder_name)
        file_path = os.path.join(folder_path, 'index-de.html')

        if os.path.isfile(file_path):
            print(f"Processing: {file_path}")
            with open(file_path, 'r', encoding='utf-8') as f:
                html_content = f.read()

            # Update resource paths to include the language code
            updated_html_content = update_resource_paths(html_content, lang_code)

            # Save the updated HTML content back to the file
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(updated_html_content)
            print(f"Updated file: {file_path}")
        else:
            print(f"File not found: {file_path}")

# Main logic
if __name__ == "__main__":
    lang_code = 'de'
    
    with open('json/en-calculators.json', encoding='utf-8') as f:
        calculators = json.load(f)

    process_html_files(calculators, lang_code)
