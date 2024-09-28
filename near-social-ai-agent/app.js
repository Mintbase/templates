const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('public', express.static(path.join(__dirname, 'public')));

const profileRouter = require('./routes/profile');
const postRouter = require('./routes/post');
const followRouter = require('./routes/follow');

app.use('/api/profile', profileRouter);
app.use('/api/post', postRouter);
app.use('/api/follow', followRouter);
app.get("/", (req, res) => res.send("Express on Azure New"));
app.get('/.well-known/ai-plugin.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(path.join(__dirname, 'public/.well-known/ai-plugin.json'));
});

app.listen(8080, () => {
    console.log("AI Agent Running on port : 8080")
})