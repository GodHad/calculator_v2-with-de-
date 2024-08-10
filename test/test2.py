import os
import requests
import re
from bs4 import BeautifulSoup

def getShareModalHtml(calculator):
    # Make a GET request to the API endpoint
    response = requests.get(f"https://www.calculator.io/{calculator}/")

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find the modal-share class in the HTML
        modal_share_html = soup.find(class_='modal-share')
        
        if modal_share_html:
            # Extract the HTML content of the modal-share class
            modal_share_html_content = modal_share_html.prettify()
            
            # Print or process the HTML content as needed
            return modal_share_html_content
        else:
            print("Modal-share class not found in the HTML.")
            return ''
    else:
        print("Failed to retrieve HTML content from the endpoint. Status code:", response.status_code)
        return ''

def simplify_directory_structure(source_dir, target_dir):

    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    for filename in os.listdir(source_dir):
        calculator = os.path.splitext(filename)[0]
        print(calculator) 

        new_calc_directory = os.path.join(target_dir, calculator)
        if not os.path.exists(new_calc_directory):
            os.makedirs(new_calc_directory)

        index_file = os.path.join(source_dir, calculator, 'index.html')
        dest_index_file = os.path.join(target_dir, calculator, 'index.html')

        with open(index_file, 'r') as input_file:
            file_contents = input_file.read()

        # replace js path
        modified_contents = file_contents.replace("./assets/js/calculator.js", f"./assets/js/calculator/{calculator}/calculator.js")
        modified_contents = modified_contents.replace("./assets/js/helpers.js", f"./assets/js/calculator/{calculator}/helpers.js")
        modified_contents = modified_contents.replace("./assets/js/chart.js", f"./assets/js/calculator/{calculator}/chart.js")
        
        # add share button
        replace_text1 = """
                <div class="calculator-content calculator-content--gray calculator-content--footer calculator-content--small row  ">
                    <button class="button button--icon js-modal-open" data-modal="share">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 6C21 7.65685 19.6569 9 18 9C16.8255 9 15.8087 8.32508 15.3161 7.34193C15.1138 6.93815 15 6.48237 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6Z" fill="white"></path>
                            <path d="M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 17.5176 15.1138 17.0619 15.3161 16.6581C15.8087 15.6749 16.8255 15 18 15C19.6569 15 21 16.3431 21 18Z" fill="white"></path>
                            <path d="M9 12C9 12.4824 8.88616 12.9381 8.68387 13.3419C8.19134 14.3251 7.17449 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.17449 9 8.19134 9.67492 8.68387 10.6581C8.88616 11.0619 9 11.5176 9 12Z" fill="white"></path>
                            <path d="M8.68387 13.3419C8.88616 12.9381 9 12.4824 9 12C9 11.5176 8.88616 11.0619 8.68387 10.6581M8.68387 13.3419C8.19134 14.3251 7.17449 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.17449 9 8.19134 9.67492 8.68387 10.6581M8.68387 13.3419L15.3161 16.6581M8.68387 10.6581L15.3161 7.34193M15.3161 7.34193C15.8087 8.32508 16.8255 9 18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 6.48237 15.1138 6.93815 15.3161 7.34193ZM15.3161 16.6581C15.1138 17.0619 15 17.5176 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.8255 15 15.8087 15.6749 15.3161 16.6581Z" stroke="#336BFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
"""
        replace_text2 = """
                <div class="calculator-content calculator-content--gray calculator-content--footer calculator-content--small row tab tab--active" data-tab="0">
                    <button class="button button--icon js-modal-open" data-modal="share">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 6C21 7.65685 19.6569 9 18 9C16.8255 9 15.8087 8.32508 15.3161 7.34193C15.1138 6.93815 15 6.48237 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6Z" fill="white"></path>
                            <path d="M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 17.5176 15.1138 17.0619 15.3161 16.6581C15.8087 15.6749 16.8255 15 18 15C19.6569 15 21 16.3431 21 18Z" fill="white"></path>
                            <path d="M9 12C9 12.4824 8.88616 12.9381 8.68387 13.3419C8.19134 14.3251 7.17449 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.17449 9 8.19134 9.67492 8.68387 10.6581C8.88616 11.0619 9 11.5176 9 12Z" fill="white"></path>
                            <path d="M8.68387 13.3419C8.88616 12.9381 9 12.4824 9 12C9 11.5176 8.88616 11.0619 8.68387 10.6581M8.68387 13.3419C8.19134 14.3251 7.17449 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.17449 9 8.19134 9.67492 8.68387 10.6581M8.68387 13.3419L15.3161 16.6581M8.68387 10.6581L15.3161 7.34193M15.3161 7.34193C15.8087 8.32508 16.8255 9 18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 6.48237 15.1138 6.93815 15.3161 7.34193ZM15.3161 16.6581C15.1138 17.0619 15 17.5176 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.8255 15 15.8087 15.6749 15.3161 16.6581Z" stroke="#336BFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
"""
        modified_contents = modified_contents.replace("<div class=\"calculator-content calculator-content--gray calculator-content--footer calculator-content--small row  \" >", replace_text1)
        modified_contents = modified_contents.replace("<div class=\"calculator-content calculator-content--gray calculator-content--footer calculator-content--small row tab tab--active\" data-tab=\"0\">", replace_text2)
        
        # modify wrapper div
        from_text = """
<div style="width: 100%;">
    <div style="width:350px;float:left;padding: 15px;">
"""
        to_text = """
<div class="calculator">
	<div class=" calculator__container calculator__container--main row">
		<div class="calculator-aside col">
"""
        modified_contents = modified_contents.replace(from_text, to_text)
        modified_contents = modified_contents.replace("<div style=\"float:left;padding: 15px; overflow: scroll;\">", "<div class=\"calculator-main col\" id=\"result-container\">")

        # add app.js
        modified_contents = modified_contents.replace("<script async src=\"./assets/js/lib/math.min.js\"></script>", "</div>\n<script async src=\"./assets/js/lib/math.min.js\"></script>\n<script async src=\"./assets/js/app.js\"></script>")
        
        # add share modal code
        share_modal_html = getShareModalHtml(calculator)
        share_modal_html = share_modal_html.replace("<!-- CALCULATOR, LLC at www.calculator.io. Use is granted only if this statement and all links to www.calculator.io are maintained. -->", "")
        share_modal_html = share_modal_html.replace("https://www.calculator.io/widget", "https://calc.size.ly/embed")
        share_modal_html = share_modal_html.replace("https://www.calculator.io/embed", "https://calc.size.ly/embed")
        share_modal_html = share_modal_html.replace("https://www.calculator.io", "https://www.size.ly")
        pattern = r'<font font size="1" color="#333">https://www\.size\.ly/([^/]*)/</font>'
        replacement_text = r'<font color="#333" size="1">Size.ly/Calculator</font>'
        share_modal_html = re.sub(pattern, replacement_text, share_modal_html)

        body_html = "<body style=\"background-color: transparent !important; min-height: 0 !important\">"
        modified_contents = modified_contents.replace(body_html, body_html + "\n<div class=\"modal-window\" style=\"opacity: 0; pointer-events: none;\">\n"+ share_modal_html + "\n</div>")

        with open(dest_index_file, 'w', encoding='utf-8') as output_file:
            output_file.write(modified_contents)

source_directory = 'calc'
target_directory = 'newcalc'

simplify_directory_structure(source_directory, target_directory)


