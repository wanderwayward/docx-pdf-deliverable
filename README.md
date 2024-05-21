# Document Converter Service

This service converts DOCX documents to PDF format using a Node.js backend that leverages the `libreoffice-convert` package and LibreOffice.

## Features

- File conversion from DOCX to PDF.
- Dockerized application setup for easy deployment and scaling.
- Integrated error handling for file uploads and conversions.

## Prerequisites

- Docker
- Node.js (for local development)
- A Git repository

## Local Setup

1. **Clone the Repository**
   Clone the project using the following command:
   ```bash
   git clone https://github.com/louderthanme/DocxToPdf.git
   cd DocxToPdf

## Install Dependencies
yarn install

## Run the Application Locally

Ensure LibreOffice is installed on your system.

Run the application using:
yarn dev


## Local Deployment

Build the Docker Image
docker build -t docx-to-pdf-converter .
Run the Docker Container

docker run -p 3000:3000 docx-to-pdf-converter

## Deploy to Render

Push your Docker image to a registry.
Set up a web service on Render using the pushed image.

## Environment Variables

REACT_APP_API_URL - Set this in your frontend to point to the deployed service URL.
TypeScript Configuration

Here is a sample tsconfig.json for setting up TypeScript:

{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2018",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}

## Handling CORS

To handle CORS and allow your frontend to communicate with the backend, add CORS middleware to your Express setup:

const cors = require('cors');
app.use(cors({
  origin: 'https://yourfrontendurl.com' // Adjust this to match your frontend URL
}));


## Accessing the Service

Navigate to the public URL provided by Render or your deployment service.
Use the provided endpoints to upload documents for conversion.

## API Endpoints
POST /convert: Accepts a DOCX file and returns a PDF file.
Contributing
Contributions are welcome! Please fork the repository and submit pull requests with any enhancements or bug fixes.

Licensed under MIT license
