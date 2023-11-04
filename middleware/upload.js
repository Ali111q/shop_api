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
});

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos"); // Change the destination to a "videos" directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension =file.originalname.split('.').pop(); // Use path module to get the file extension
    cb(null, uniqueSuffix + fileExtension); // Use the correct file extension
  },
});


const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/png'];
  if (!allowedFileTypes.includes(file.mimetype)) {
    cb(new Error('Invalid file type'), false);
    return;
  }
  cb(null, true);
};
const fileFilter2 = (req, file, cb) => {
  console.log(req.body.video, '#####################');
  const allowedFileTypes = ['video/mp4', 'video/webm', 'video/quicktime']; // Define acceptable video formats
  if (!allowedFileTypes.includes(file.mimetype)) {
    cb(new Error('Invalid file type'), false);
    return;
  }
  req.video = true
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
const upload2 = multer({ storage: storage2, fileFilter: fileFilter2 });

module.exports.upload = upload;
module.exports.upload2 = upload2;
