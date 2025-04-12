import fs from 'fs';
import path from 'path';
import { compile } from 'svelte/compiler';
import vm from 'vm';

export default () => {
    // Read the .svelte file as string
    const filePath = path.resolve('./src/pages/invoice.svelte');
    const source = fs.readFileSync(filePath, 'utf-8');

    // Compile to SSR-compatible JS
    const { js } = compile(source, { generate: 'ssr' });

    // Run the code in a VM to get the component
    const context = { module: {}, exports: {} };
    vm.createContext(context);
    vm.runInContext(js.code, context);

    // Now render it
    const { render } = context.module.exports;
    const { html, css } = render({ name: 'World' });

    console.log('HTML:', html);
    if (css?.code) console.log('CSS:', css.code);
}