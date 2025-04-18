import os
from appwrite.client import Client
from appwrite.services.databases import Databases
import asyncio
import .pdf

def main(context):
    client = Client()
    client.set_project(os.environ.get('APPWRITE_FUNCTION_PROJECT_ID'))
    
    if 'x-appwrite-user-jwt' in context.req.headers:
        client.set_jwt(context.req.headers['x-appwrite-user-jwt'])
    else:
        return context.res.text("Access denied: This function requires authentication. Please sign in to continue.")
    
    # Set database client
    repository.db = Databases(client)
    # Parse request parameters
    params = context.req.json()
    
    pdf_buffer = asyncio.run(pdf.generate_estimate(params['id']));

    # Return PDF as binary response
    return context.res.binary(pdf_buffer, 200, {'Content-Type': 'application/pdf'})