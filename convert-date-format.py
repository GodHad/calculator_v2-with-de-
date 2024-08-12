import os
import re

# Directory where your script is located
base_dir = os.path.dirname(__file__)

# Pattern to find the placeholder and value attributes
placeholder_pattern = re.compile(r'placeholder="mm/dd/yyyy"', re.IGNORECASE)
value_pattern = re.compile(r'value="(\d{2})/(\d{2})/(\d{4})"', re.IGNORECASE)

def replace_dates(content):
    """Update date format in HTML content."""
    # Update placeholder attributes
    content = placeholder_pattern.sub('placeholder="dd/mm/yyyy"', content)
    # Update value attributes
    content = value_pattern.sub(lambda m: f'value="{m.group(2)}/{m.group(1)}/{m.group(3)}"', content)
    return content

def replace_dates_in_file(file_path):
    """Read, update, and write HTML file."""
    try:
        with open(file_path, 'r+', encoding='utf-8') as file:
            content = file.read()
            updated_content = replace_dates(content)
            file.seek(0)
            file.write(updated_content)
            file.truncate()
            print(f"Updated file: {file_path}")  # Debug print
    except Exception as e:
        print(f"Error processing file {file_path}: {e}")

def process_directories(base_dir):
    """Walk through all subdirectories and process each index-de.html file."""
    for root, dirs, files in os.walk(base_dir):
        print(f"Current Directory: {root}")  # Debug print
        for file in files:
            if file == 'index-de.html':
                file_path = os.path.join(root, file)
                print(f"Found file: {file_path}")  # Debug print
                replace_dates_in_file(file_path)

# Call the function to process all directories
process_directories(base_dir)
