require('dotenv').config();
const db = require('./db')   

const port = process.env.PORT;
const express = require('express');
const app = express();
app.use(express.json());    //Middleware para parsear o corpo da requisição como JSON

//Rota para buscar avisos
app.get('/avisos', async (req, res) => {
    const notices = await db.selectNotices();
    res.json(notices);
});

app.post('/avisos', async (req, res) => {
    const notice = req.body;
    await db.insertNotices(notice);
    res.status(201).send('Aviso inserido com sucesso');
});



app.listen(port)