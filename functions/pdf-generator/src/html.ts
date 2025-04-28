import Handlebars from 'handlebars';
import estimateTemplate from './templates/estimate.hbs.js';

async function generateEstimate(business: any, estimate: any) {
    const template = Handlebars.compile(estimateTemplate);
    // Apply the data to the template
    return template({
        business,
        estimate
    });
}

export default {
    generateEstimate
}