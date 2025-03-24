import { Client, Databases, ID } from 'node-appwrite';

// This is the main function that will handle the event
export default async function(req, res) {
  // Initialize the Appwrite SDK
  const client = new Client();
  
  // Set the endpoint and API key from the environment variables
  client
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  // Initialize the Databases service
  const databases = new Databases(client);
  
  // Get the user data from the event payload
  const user = JSON.parse(req.payload);
  
  try {
    // Create a new document in the users collection
    const response = await databases.createDocument(
      process.env.DATABASE_ID, // Replace with your database ID or set as environment variable
      process.env.USERS_COLLECTION_ID, // Replace with your users collection ID or set as environment variable
      user.$, // Generate a unique document ID
    );
    
    // Return a success response
    return res.json({
      success: true,
      message: 'User successfully added to collection',
      user: response
    });
  } catch (error) {
    console.error('Error adding user to collection:', error);
    
    // Return an error response
    return res.json({
      success: false,
      message: 'Failed to add user to collection',
      error: error.message
    }, 500);
  }
};