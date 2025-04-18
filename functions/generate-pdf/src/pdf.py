from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import base64
from .repository import get_estimate_by_id

async def generate(html_content):
    # Set up the Chrome options for headless browsing
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--window-size=1280,1696')  # Set window size to ensure full page rendering
    
    # Initialize the WebDriver
    driver = None
    try:
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
        
        # Load the HTML content
        driver.get("data:text/html;charset=utf-8," + html_content)
        
        # Wait for the page to fully render
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, 'body'))
        )
        
        # Set the print options
        print_options = {
            'landscape': False,
            'displayHeaderFooter': False,
            'printBackground': True,
            'preferCSSPageSize': True,
            'scale': 1,  # Ensure the scale is set to 1 for full-size rendering
        }
        
        # Generate the PDF
        pdf_base64 = driver.execute_cdp_cmd('Page.printToPDF', print_options)['data']
        
        # Decode the base64-encoded PDF data to bytes
        return base64.b64decode(pdf_base64)
        
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    finally:
        # Close the WebDriver if it was initialized
        if driver:
            driver.quit()

async def generate_estimate(estimate_id):
    # Get estimate by ID
    estimate = await get_estimate_by_id(estimate_id)
    
    # Generate HTML content
    html_content = await html.generate("estimate", estimate)
    
    # Generate PDF from HTML and return the byte array
    return await generate(html_content)