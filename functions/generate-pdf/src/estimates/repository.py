from src.appwrite import databases, database_id, collections

async def get_by_id(id):
    """
    Retrieve an estimate document by its ID.
    
    Args:
        id (str): The ID of the estimate document to retrieve
        
    Returns:
        dict: The retrieved estimate document
    """
    return await databases.get_document(database_id, collections['estimates'], id)