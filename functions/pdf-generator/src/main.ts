import { execSync } from 'node:child_process';
import puppeteer from 'puppeteer';

let installed = false;

const testHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Test PDF Generation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      line-height: 1.6;
    }
    h1 { color: #333; }
    .content {
      border: 1px solid #ddd;
      padding: 20px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1>HTML to PDF Test</h1>
  <div class="content">
    <p>This is a test page for converting HTML to PDF using Puppeteer in Node.js 22.</p>
    <p>Current date: ${new Date().toLocaleDateString()}</p>
  </div>
</body>
</html>
`;

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

type Context = {
  req: any;
  res: any;
  log: (msg: any) => void;
  error: (msg: any) => void;
};

export default async ({ res, req, log, error }: Context) => {
  if (installed) {
    log('Chromium already installed.');
  } else {
    execSync('apk add /usr/local/server/src/function/*.apk');
    log('Chromium installed.');
    installed = true;
  }

  const pdfBuffer = await htmlToPdfBuffer(testHtml);
  return res.binary(pdfBuffer);
};
