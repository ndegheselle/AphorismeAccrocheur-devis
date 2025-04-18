import os
from appwrite.client import Client

# Set this from the main.py file
databases = None

# Database and collection IDs
database_id = "67dda6ca000771a6a0f1"
bucket_id = "67f4d5c000293a2abc0f"
collections = {
    "clients": "67e15117000204564f9d",
    "estimates": "67e4353d00074cb2008c",
    "business": "67f3997b0019b415c683"
}

async def get_estimate_by_id(id):
    """
    Retrieve an estimate document by its ID.
    
    Args:
        id (str): The ID of the estimate document to retrieve
        
    Returns:
        dict: The retrieved estimate document
    """
    return await databases.get_document(database_id, collections['estimates'], id)