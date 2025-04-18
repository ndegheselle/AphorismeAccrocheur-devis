from src.lib import html
from src.lib import pdf
from src.estimates import repository

async def generate(estimate_id):
    # Get estimate by ID
    estimate = await repository.get_by_id(estimate_id)
    # Generate HTML content
    html_content = await html.generate("estimate", estimate)
    # Generate PDF from HTML
    return await pdf.generate(html_content)