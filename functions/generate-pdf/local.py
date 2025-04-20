from src.pdf import generate_estimate

def main():
    pdf_data = generate_estimate({})
    with open("output.pdf", 'wb') as file:
        file.write(pdf_data)

if __name__ == '__main__':
    main()