const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');

// Construct the full path to the nitebite.zip file
const zipFilePath = path.join(__dirname, 'nitebite.zip');

// Log the path to verify it's correct
console.log('Looking for zip file at:', zipFilePath);

// Check if the file exists
if (!fs.existsSync(zipFilePath)) {
  console.error('ZIP file not found:', zipFilePath);
  process.exit(1);
}

try {
  // Create a new AdmZip instance with nitebite.zip
  const zip = new AdmZip(zipFilePath);

  // Extract all contents into the current directory
  zip.extractAllTo(__dirname, true);
  console.log('Extraction complete!');
} catch (error) {
  console.error('Error extracting ZIP file:', error);
}
