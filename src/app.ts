// Import necessary modules
import express, { Request, Response } from "express";
import multer from "multer";
import fs, { constants } from "fs"; // File system for handling file operations
import convertToPdf from "./convertToPdf"; // Custom module for converting documents to PDF
import formatDate from "./dateFormatting"; // Utility to format the date for filenames
import cors from "cors"; // CORS middleware to enable cross-origin requests

// Extend Express request to include file and newFilename properties
interface CustomRequest extends Request {
  file?: Express.Multer.File;
  newFilename?: string;
}

// Create an Express application
const app = express();
const port = 3000;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    // Check if the upload directory exists and is writable

    fs.access(uploadDir, constants.R_OK | constants.W_OK, (err) => {
      if (err) {
        // If an error occurs, assume the directory doesn't exist and try to create it
        try {
          fs.mkdirSync(uploadDir, { recursive: true });
          cb(null, uploadDir); // Directory successfully created
        } catch (mkdirErr) {
          console.error(`Error creating directory: ${uploadDir}`, mkdirErr);
          // Check if mkdirErr is an instance of Error and pass it, otherwise create a new Error
          if (mkdirErr instanceof Error) {
            cb(mkdirErr, uploadDir); // Pass the error and the directory
          } else {
            cb(new Error("Failed to create directory"), uploadDir); // Pass a new Error object if mkdirErr isn't an error
          }
        }
      } else {
        // No error, the directory exists and can be written to
        cb(null, uploadDir);
      }
    });
  },

  // Function to determine the filename within the destination
  filename: function (req: CustomRequest, file, cb) {
    const fileExtensionRegex = /\.[0-9a-z]+$/i;
    const baseName = file.originalname.replace(fileExtensionRegex, "");
    const newFilename = `${baseName} - ${formatDate(new Date())}`;
    req.newFilename = newFilename;
    cb(null, newFilename);
  },
});

// Multer configuration for handling file uploads
const upload = multer({ storage: storage });

// CORS configuration
const corsOptions = {
  origin: 'https://frontend-docxtopdf.vercel.app', // make sure to change this to your frontend URL
  optionsSuccessStatus: 200 
};

// Apply CORS middleware to the app
app.use(cors(corsOptions));

// Route to handle file conversion
app.post(
  "/convert",
  upload.single("file"),
  (req: CustomRequest, res: Response) => {
    if (!req.file) {
      // No file was uploaded
      return res.status(400).send("No file uploaded.");
    }

    // Check file extension
    const fileExtension = req.file.originalname.split(".").pop();
    if (fileExtension !== "doc" && fileExtension !== "docx") {
      return res
        .status(400)
        .send("Invalid file type. Please upload a .doc or .docx file.");
    }

    const filePath = req.file.path;// Path to the uploaded file

    // Convert the uploaded file to PDF
    convertToPdf(filePath, (err, convertedFilePath) => {
      if (err) {
        console.error("Error converting file:", err);
        return res.status(500).send("Error converting file");
      }

      const filename = req.newFilename
        ? `${req.newFilename}.pdf`
        : "default_filename.pdf";

      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

      if (!convertedFilePath) {
        console.error("Conversion did not return a file path.");
        return res
          .status(500)
          .send("File conversion did not return a valid path.");
      }

      console.log("Converted file path:", convertedFilePath);

      if (!req.newFilename) {
        console.error("No new filename set.");
        return res.status(500).send("No new filename set.");
      }

      // Download the converted PDF file
      res.download(convertedFilePath, req.newFilename, (downloadErr) => {
        if (downloadErr) {
          console.error("Error downloading file:", downloadErr);
          res.status(500).send("Error downloading file");
        } else {
          fs.unlinkSync(convertedFilePath); // Ensure to delete the file after sending it
        }
      });
    });
  }
);

//start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
