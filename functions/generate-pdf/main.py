import os
from appwrite.client import Client
from appwrite.services.databases import Databases
from .src.repository import databases
from .src.pdf import generate_estimate_from_id

def main(context):
    client = (
        Client()
            .set_project(os.environ["APPWRITE_FUNCTION_PROJECT_ID"])
    )
    
    context.log("Checking user authentification.")
    if "x-appwrite-user-jwt" in context.req.headers:
        client.set_jwt(context.req.headers["x-appwrite-user-jwt"])
    else:
        return context.res.json({"error": "Access denied: This function requires authentication. Please sign in to continue."}, 401)
    
    databases = Databases(client)
    # Parse request parameters
    # params = context.req.body_json
    params = context.req.query

    if "id" not in params:
        return context.res.json({"error": "Missing required parameter: id"}, 400)

    context.log("Starting generation ...")
    pdf_buffer = generate_estimate_from_id(params["id"])
    context.log("Pdf generated.")
    # Return PDF as binary response
    return context.res.binary(pdf_buffer)