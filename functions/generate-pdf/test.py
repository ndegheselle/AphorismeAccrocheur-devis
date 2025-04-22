def main(context):
    # Create a test file content
    file_content = b"This is a test file."
    file_name = "test.txt"

    # Set the response headers to indicate a file download
    context.res.header("Content-Disposition", f"attachment; filename={file_name}")
    context.res.header("Content-Type", "application/octet-stream")

    # Return the file content as binary
    context.res.send(file_content)