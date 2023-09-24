const multer = require("multer");

// Define the storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, uniqueSuffix + "." + fileExtension);
  },
  
});

// Create a Multer instance with the storage engine
const upload = multer({ storage: storage }).single('image');

module.exports = upload;
