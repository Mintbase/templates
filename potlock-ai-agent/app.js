const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('public', express.static(path.join(__dirname, 'public')));

const projectRouter = require('./routes/project');
const donationRouter = require('./routes/donation');

app.use('/api/project', projectRouter);
app.use('/api/donation', donationRouter);
app.get("/", (req, res) => res.send("Express on Azure"));
app.get('/.well-known/ai-plugin.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(path.join(__dirname, 'public/.well-known/ai-plugin.json'));
});

app.listen(8080, () => {
    console.log("PotLock AI Agent Running on port : 8080")
})