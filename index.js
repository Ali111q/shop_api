const express = require('express')
const { User } = require('./model/user')

const productRoutes = require("./routes/products"); // Adjust the path as needed


const app = express()
const bodyParser = require('body-parser');
const cron = require('node-cron'); // Import the cron library
const path = require("path");
const formidable = require("express-formidable"); // Import express-formidable
const fs = require("fs");

const port = 3022
const authRoutes = require('./routes/auth')
const countryRoutes = require('./routes/country')
const cityRoutes = require('./routes/city')
const bannerRoutes = require("./routes/banner");
const category = require('./routes/category')
const home = require('./routes/home');
const user = require('./routes/user');
const driver = require('./routes/driver')
var cors = require("cors");
const { Op } = require('sequelize');
const fileUpload = require('express-fileupload');

const scheduledJob = cron.schedule('*/2 * * * *', async () => {
  // Find and delete the user by ID
  const users = await User.destroy({
    where: {
      verified: false,
      createdAt: {
        [Op.lt]: new Date(Date.now() - (10 * 60 * 1000)) // Delete users who have not been verified in the last 10 minutes
      }
    }
  });

});
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads/images', express.static('uploads/images'));
app.use('/uploads/videos', express.static('uploads/videos'));

app.use('/api/auth', authRoutes);
app.use('/api/country', countryRoutes);
app.use('/api/city', cityRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/products", productRoutes); // You can adjust the base path as needed
app.use("/api/category", category); // You can adjust the base path as needed
app.use("/api/home", home); // You can adjust the base path as needed
app.use('/api/user', user);
app.use('/api/driver', driver);

app.post('/upload', function (req, res) {
  const video = req.files.video;

  // Save the uploaded file to the desired location
  video.mv('uploads/videos/' + video.name, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded successfully!');
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))