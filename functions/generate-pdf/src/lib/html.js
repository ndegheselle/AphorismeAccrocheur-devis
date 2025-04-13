import Handlebars from 'handlebars';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name properly in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read and compile a template
async function generate(templateName, data) {
    const templatePath = path.resolve(__dirname, `../pages/${templateName}.hbs`);
    const templateSource = await fs.promises.readFile(templatePath, 'utf8');
    const template = Handlebars.compile(templateSource);

    // Apply the data to the template
    const html = template(data);

    return html;
}

export default {
    generate
}