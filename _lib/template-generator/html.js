import Handlebars from 'handlebars';
import estimateTemplate from './templates/estimate.hbs';

async function generateEstimate(business, estimate) {
    const template = Handlebars.compile(estimateTemplate);
    // Apply the data to the template
    return template(estimate);
}

export default {
    generateEstimate
}