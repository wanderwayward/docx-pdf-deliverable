import libre from "libreoffice-convert"; // Import the libreoffice-convert module
import fs from "fs"; // Import the Node.js file system module for file operations
import path from "path"; // Import the path module for file path operations

const extend = ".pdf"; // Set the default extension for the output files

const convertToPDF = (
  filePath: string,
  callback: (error: Error | null, outputPath?: string) => void
) => {
  // Generate the output file path with the same name as the input file but with the .pdf extension
  const outputPath = path.join(
    path.dirname(filePath),
    path.basename(filePath, path.extname(filePath)) + extend
  );

  // Read the file into a Buffer
  fs.readFile(filePath, (readError, fileContent) => {
    if (readError) {
      console.error(`Error reading file: ${readError.message}`);
      return callback(readError);
    }

    // Convert the Buffer to a PDF
    libre.convert(
      fileContent, //the file oyu put in
      extend, //desired output format
      undefined, //no specified options
      (err: Error | null, done: Buffer) => {
        if (err) {
          console.error(`Conversion error: ${err.message}`);
          return callback(err);
        }

        // Write the resulting Buffer to a file
        fs.writeFile(outputPath, done, (writeError) => {
          if (writeError) {
            console.error(`Error writing file: ${writeError.message}`);
            return callback(writeError); //pass error to callback
          }

          console.log("Conversion successful:", outputPath);
          callback(null, outputPath); //pass the output path to the callback
        });
      }
    );
  });
};

export default convertToPDF;
