from appwrite import database, collections

async def get_by_id(id):
    """
    Retrieve an estimate document by its ID.
    
    Args:
        id (str): The ID of the estimate document to retrieve
        
    Returns:
        dict: The retrieved estimate document
    """
    return await database['db'].get_document(database['id'], collections['estimates'], id)

# Repository object with methods
repository = {
    "get_by_id": get_by_id
}