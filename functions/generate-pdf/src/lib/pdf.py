from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import base64

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
        pdf_path = 'output.pdf'
        pdf_base64 = driver.execute_cdp_cmd('Page.printToPDF', print_options)['data']

        # Decode the base64-encoded PDF data
        pdf_data = base64.b64decode(pdf_base64)

        # Save the PDF to a file
        with open(pdf_path, 'wb') as file:
            file.write(pdf_data)

        print(f"PDF has been saved to {pdf_path}")

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        # Close the WebDriver if it was initialized
        if driver:
            driver.quit()