import os
from appwrite.client import Client
from appwrite.services.databases import Databases
import src.estimates.pdf as estimate

async def main(req, res, log):
    client = Client()
    client.set_project(os.environ.get('APPWRITE_FUNCTION_PROJECT_ID'))
    
    if 'x-appwrite-user-jwt' in req.headers:
        client.set_jwt(req.headers['x-appwrite-user-jwt'])
    else:
        return res.text("Access denied: This function requires authentication. Please sign in to continue.")
    
    # Set database client
    repository.db = Databases(client)
    # Parse request parameters
    params = req.json()
    
    pdf_buffer = await estimate.generate(params['id']);

    # Return PDF as binary response
    return res.binary(pdf_buffer, 200, {'Content-Type': 'application/pdf'})