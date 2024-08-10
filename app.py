import requests
import bs4
import json
import os
from urllib.parse import urljoin, urlparse
import time

def download_resource(url, base_path):
    """Download a resource and save it to the specified base path, skipping if it already exists."""
    parsed_url = urlparse(url)
    filename = os.path.basename(parsed_url.path)
    if filename:
        full_path = os.path.join(base_path, filename)
        # Check if the file already exists
        if os.path.exists(full_path):
            print(f"File already exists, skipping: {full_path}")
            return full_path
        
        response = requests.get(url)
        time.sleep(1)  # Be polite to the server
        if response.status_code == 200:
            # Save the file
            print(f"Saving to: {full_path}")
            with open(full_path, 'wb') as file:
                file.write(response.content)
            return full_path
        else:
            print(f"Failed to download {url}. Status code: {response.status_code}")
            return None
    else:
        print(f"Invalid filename for URL: {url}")
        return None


def update_resource_links(soup, base_url, assets_folder):
    """Update resource links in the BeautifulSoup object to point to local copies."""
    # Handle <script> tags with src attributes
    for tag in soup.find_all('script', src=True):
        src = tag['src']
        local_path = download_resource(urljoin(base_url, src), assets_folder)
        if local_path:
            tag['src'] = os.path.join('assets', os.path.basename(src))

    # Handle <link> tags with href attributes
    # for tag in soup.find_all('link', href=True):
    #     href = tag['href']
    #     local_path = download_resource(urljoin(base_url, href), assets_folder)
    #     if local_path:
    #         tag['href'] = os.path.join('assets', os.path.basename(href))


def get_calculator_html(calculator, layout, lang, dest_uri, org_uri):
    # Make a GET request to the API endpoint
    url = "https://calculator.io" + calculator['uri']
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the HTML content
        soup = bs4.BeautifulSoup(response.text, 'html.parser')
        base_url = url
        # Create an assets directory if it doesn't exist
        assets_folder = 'public/assets/js/' + dest_uri + "/" + lang
        os.makedirs(assets_folder, exist_ok=True)
        # Update resource links
        update_resource_links(soup, base_url, assets_folder)
        def replace_urls(soup, old_url, new_url):
            # Replace URLs in all attributes
            for tag in soup.find_all(True):  # Find all tags
                for attr in tag.attrs:
                    if isinstance(tag[attr], str) and old_url in tag[attr]:
                        tag[attr] = tag[attr].replace(old_url, new_url)

            # Replace URLs in text nodes
            for tag in soup.find_all(string=True):
                if old_url in tag:
                    tag.replace_with(tag.replace(old_url, new_url))

            return soup
        
        soup = replace_urls(soup, org_uri, dest_uri + lang)
        soup = replace_urls(soup, 'https://www.calculator.io/', 'https://www.size.ly/')

        # Find and handle missing elements
        modal_share_html = str(soup.find(class_='modal-share') or '')
        calculator_form_html = str(soup.select_one('#calculator_form') or '')
        
        calculator_results = soup.select('.calculator-result')
        result_container = soup.new_tag('div', attrs={'class': 'calculator-main col', 'id': 'result-container'})

        for child in calculator_results:
            result_container.append(child)
        
        result_container_html = str(result_container)

        # Replace placeholders in layout
        layout = layout.replace("{{calculator_title}}",  calculator.get('title', ''))
        layout = layout.replace("{{calculator_lang}}",   lang)
        layout = layout.replace("{{calculator_desc}}",   calculator.get('description', ''))
        layout = layout.replace("{{calculator_share}}",  modal_share_html)
        layout = layout.replace("{{calculator_form}}",   calculator_form_html)
        layout = layout.replace("{{calculator_result}}", result_container_html)

        # Create BeautifulSoup object and prettify
        return bs4.BeautifulSoup(layout, 'html.parser').prettify()

    else:
        print(f"Failed to retrieve HTML content from the endpoint. Status code: {response.status_code}")
        return ''

# Main logic
if __name__ == "__main__":
    lang = 'de'
    
    # Ensure directories exist
    os.makedirs(f'calc/{lang}', exist_ok=True)
    
    with open(f'json/{lang}-calculators.json', encoding='utf-8') as f:
        calculators = json.load(f)


    with open(f'json/en-calculators.json', encoding='utf-8') as f:
        encalculators = json.load(f)

    with open('layout.html', 'r', encoding='utf-8') as file:
        layout = file.read()

    os.makedirs(f'calc/{lang}', exist_ok=True)

    for i, calculator in enumerate(calculators):
        print(f"Processing: https://calculator.io{encalculators[i]['uri']}")
        html = get_calculator_html(calculator, layout, lang, encalculators[i]['uri'], calculator['uri'])
        
        os.makedirs(f'calc/{lang}/{encalculators[i]['uri']}', exist_ok=True)

        output_path = f"calc/{lang}/{encalculators[i]['uri']}index-{lang}.html"
        # with open(output_path, 'w', encoding='utf-8') as output_file:
        #     output_file.write(html)

    print("Processing complete.")
