import Handlebars from 'handlebars';
import estimateTemplate from './templates/estimate.hbs.js';

Handlebars.registerHelper('formatDate', function(date: Date) {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('fr-FR', options);
});

async function generateEstimate(business: any, client: any, estimate: any) {
    const template = Handlebars.compile(estimateTemplate);
    // Apply the data to the template
    console.log('estimate', estimate);
    return template({
        business,
        client,
        estimate
    }, {
        allowProtoPropertiesByDefault: true,
    });
}

export default {
    generateEstimate
}