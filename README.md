# Document Converter Service

This service converts DOCX documents to PDF format using a Node.js backend that leverages the libreoffice-convert package and LibreOffice.

## Features
- File conversion from DOCX to PDF.
- Dockerized application setup for easy deployment and scaling.
- Integrated error handling for file uploads and conversions.

## Prerequisites
- Docker
- Node.js (for local development)
- A Git repository

## Local Setup

### Clone the Repository
Clone the project using the following command:

git clone https://github.com/louderthanme/docx-pdf-deliverable.git
cd docx-pdf-deliverable

### Install Dependencies

yarn install


### Running the Application Locally
You need to make sure you have LibreOffice installed on your system. 

Run the application using:

yarn dev


## Local Deployment

### Installing Docker
Before you can build and run the Docker container, you need to have Docker installed on your machine. Here’s how to install Docker for Windows and Mac:
- Visit [Docker Hub](https://www.docker.com/products/docker-desktop) to download and install Docker Desktop for Windows or Mac.

#### Verify Installation
Run:

docker --version


#### Build your Docker Image
Open a bash terminal and `cd` to where your project is located, specifically where the Dockerfile is located. In this repository, it is at the root level.

Run:
docker --version


#### Build your Docker Image
Open a bash terminal and `cd` to where your project is located, specifically where the Dockerfile is located. In this repository, it is at the root level.

Run:
docker build -t docx-to-pdf-converter .

This tells Docker to use the Dockerfile in the current directory. The tag for your Docker image is set here as `docx-to-pdf-converter`.

After the build finishes, check for your image on a terminal running:
docker images


**Run your container using:**

docker run -p 3000:3000 docx-to-pdf-converter

This command maps port 3000 of the container to port 3000 on your host machine.
You can access your app on http://localhost:3000

## Deploy to Render

1. Publish your project to GitHub.
2. Log in to your Render account and go to the Dashboard.
3. Click on the "New +" button and select "Web Service."
4. Connect your GitHub account if you haven't already and select the repository where you pushed your Node.js application.
5. Configure your web service:
   - Environment: Select "Docker" as your environment.
   - Region: Choose the region closest to your users for better performance.
   - Build Command: This can typically be left blank because your Dockerfile handles the build.
   - Start Command: This is usually not needed as well since your Dockerfile specifies the CMD.
6. Configure Environment Variables
   - API_URL – Set this in your frontend to point to the deployed service URL. Include it when you await your response.
7. Deploy your application:
   - Click on ‘Create Web Service”
   - Wait for the server to deploy, this will take some time as the Dockerfile is literally installing LibreOffice on the Render service.
   - After the service is deployed, make note of the URL.

### Handling CORS
To handle CORS and allow your frontend to communicate with the backend, add CORS middleware to your Express setup in the App.ts file:
```javascript
const corsOptions = {
  origin: 'https://frontend-docxtopdf.vercel.app', // make sure to change this to your frontend URL
  optionsSuccessStatus: 200 
};
```

## Accessing the Service
Navigate to the public URL provided by Render. Use the provided endpoints to upload documents for conversion.

### API Endpoint Details
POST /convert: Accepts a DOCX file and returns a PDF file. Example of how to use it:

File Upload Handling Example
This is an example of handling file uploads on the frontend:

```javascript
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setIsDownloaded(false); // Reset on new file selection
  const files = e.target.files;
  if (files && files.length > 0) {
    const file = files[0];
    const fileExtension = file.name.split(".").pop();
    if (fileExtension !== "docx" and fileExtension !== "doc") {
      setErrorMessage('Only .doc or .docx files please.')
    } else {
      setErrorMessage("");
    }
    setFileName(file.name);
    setIsDownloaded(false);
  }
};
```

## Additional Tools for Testing
Postman or any other API client of your choice. Send a post request with a file to the appropriate URL and you can check it working before integrating it into your frontend.




