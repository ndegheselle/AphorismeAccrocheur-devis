import asyncio
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import base64
import requests
import os

async def generate(html_content):
    # If using browserless.io
    browserless_api_key = os.environ.get('BROWSERLESS_API_KEY')
    browserless_url = f"https://chrome.browserless.io/pdf?token={browserless_api_key}"
    
    # Define PDF options
    pdf_options = {
        "format": "A4",
        "margin": {
            "top": "20mm",
            "right": "20mm",
            "bottom": "20mm",
            "left": "20mm"
        },
        "displayHeaderFooter": True,
        "footerTemplate": '<div style="color: #444; font-size: 10px; text-align: center; width: 100%;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
    }
    
    # Method 2: Using Selenium with Chrome
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        # Create a temporary HTML file
        with open("temp.html", "w") as f:
            f.write(html_content)
        
        # Load the HTML file
        driver.get("file://" + os.path.abspath("temp.html"))
        
        # Set page size to A4
        driver.execute_cdp_cmd("Page.setDocumentContent", {"frameId": driver.execute_script("return document.querySelector('iframe').frameId"), "html": html_content})
        
        # Generate PDF
        pdf_data = driver.execute_cdp_cmd("Page.printToPDF", pdf_options)
        
        # Convert base64 to buffer
        pdf_buffer = base64.b64decode(pdf_data['data'])
        
        return pdf_buffer
    finally:
        driver.quit()
        # Clean up the temporary file
        if os.path.exists("temp.html"):
            os.remove("temp.html")

# Export the function
generate_pdf = {
    "generate": generate
}