const express = require('express');
require('dotenv').config()

// const configResources = require('./config/resources');
const initWebRouters = require('./routes/index');
const connectDB = require('./config/connectDB');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configResources(app);
initWebRouters(app);

connectDB();

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('running on port: ' + PORT);
});
