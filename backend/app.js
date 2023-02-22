
const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());

app.get('/', (req, res) => {
res.send('bonjour blog sport backend !');
});



module.exports = app;




