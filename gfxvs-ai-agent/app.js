const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use('public', express.static(path.join(__dirname, 'public')));

const artuploadRouter = require('./routes/artupload');

app.use('/api/artupload', artuploadRouter);
app.get("/", (req, res) => res.send("Express on Azure"));
app.get('/.well-known/ai-plugin.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(path.join(__dirname, 'public/.well-known/ai-plugin.json'));
});

app.listen(8080, () => {
    console.log("GFXvs AI Agent Running on port : 8080")
})