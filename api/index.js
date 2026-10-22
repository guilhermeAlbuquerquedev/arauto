require('dotenv').config();
require('./db')   

const port = process.env.PORT;
const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.json({
        message: 'API is running'
    })
});

app.listen(port)