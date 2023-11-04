const express = require('express')
const { User } = require('./model/user')

const productRoutes = require("./routes/products"); // Adjust the path as needed

const app = express()
const bodyParser = require('body-parser');
const cron = require('node-cron'); // Import the cron library
const path = require("path");
const formidable = require("express-formidable"); // Import express-formidable
const fs = require("fs");

const port = 3000
const authRoutes = require('./routes/auth')
const countryRoutes = require('./routes/country')
const cityRoutes = require('./routes/city')
const bannerRoutes = require("./routes/banner");
const category = require('./routes/category')
const home = require('./routes/home')

const scheduledJob = cron.schedule('*/2 * * * *', async () => {
    // Find and delete the user by ID
const users =    await User.destroy({ where: { verified:false } });

  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/country', countryRoutes);
app.use('/api/city', cityRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/products", productRoutes); // You can adjust the base path as needed
app.use("/api/category", category); // You can adjust the base path as needed
app.use("/api/home", home); // You can adjust the base path as needed



app.listen(port, () => console.log(`Example app listening on port ${port}!`))