const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const initWebRouters = require('./routes/index');
const connectDB = require('./config/connectDB');
const configResources = require('./config/resources');

dotenv.config();

let app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initWebRouters(app);
configResources(app);

connectDB();

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('running on port: ' + PORT);
});
