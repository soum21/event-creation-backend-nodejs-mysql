const express = require('express');
const app = express.Router();
const eventMedia = require('../../models').media;

app.get('/', async (req, res) => {
    const allMedia = await eventMedia.findAll();
    res.json(allMedia);
})

module.exports = app;