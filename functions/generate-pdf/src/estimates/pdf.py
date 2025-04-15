from lib.html import generate as generateHtml
from lib.pdf import generate as generatePdf
from model import repository


async def generate(estimate_id):
    # Get estimate by ID
    estimate = await repository.get_by_id(estimate_id)
    # Generate HTML content
    html_content = await generateHtml(estimate)
    # Generate PDF from HTML
    return await generatePdf(html_content)

