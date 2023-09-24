const express = require('express')
const { User } = require('./model/user')
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

const scheduledJob = cron.schedule('*/2 * * * *', async () => {
    // Find and delete the user by ID
const users =    await User.destroy({ where: { verified:false } });

  });

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

app.use('/api/auth', authRoutes);
app.use('/api/country', countryRoutes);
app.use('/api/city', cityRoutes);
app.use("/api/banner", bannerRoutes);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))