const express = require('express');

let configResources = (app) => {
    app.use(express.static('./src/downloads/samples'));
};

module.exports = configResources;
