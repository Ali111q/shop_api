const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, uniqueSuffix + "." + fileExtension);
  },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/png'];
    if (!allowedFileTypes.includes(file.mimetype)) {
      cb(new Error('Invalid file type'), false);
      return;
    }
    cb(null, true);
  },
});
const upload = multer({storage: storage})

module.exports = upload