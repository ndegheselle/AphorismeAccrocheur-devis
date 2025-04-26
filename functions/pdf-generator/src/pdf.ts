import puppeteer from 'puppeteer';
import { execSync } from 'node:child_process';

let installed = false;

function init(log: any) {
  if (installed) {
    log('Chromium already installed.');
  } else {
    execSync('apk add /usr/local/server/src/function/*.apk');
    log('Chromium installed.');
    installed = true;
  }
}

async function htmlToPdfBuffer(html: string) {
  // Launch browser
  const browser = await puppeteer.launch({ 
    headless: true,
    args: [
      "--no-sandbox",
      "--headless",
      "--disable-gpu",
      "--disable-dev-shm-usage",
    ],
  });

  try {
    // Create a new page
    const page = await browser.newPage();

    // Set content to our HTML
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF as buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    return pdfBuffer;
  } finally {
    // Always close the browser
    await browser.close();
  }
}

export default {
  init,
  htmlToPdfBuffer
}