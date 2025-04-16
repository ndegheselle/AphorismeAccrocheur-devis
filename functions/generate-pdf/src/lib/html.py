import pybars
import os

async def generate(template_name, data):
    """
    Generate HTML estimate from template and data
    
    Args:
        data (dict): Data to apply to the template
        
    Returns:
        str: Rendered HTML content
    """
    template_path = os.path.join(os.path.dirname(__file__), "../../templates/{}.hbs".format(template_name))
    # Create a Handlebars compiler
    compiler = pybars.Compiler()
    
    # Read the template file
    with open(template_path, 'r') as file:
        template_source = file.read()
    
    # Compile the template
    template = compiler.compile(template_source)
    
    # Apply the data to the template
    return template(data)