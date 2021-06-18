const path = require('path');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('yup');
});

app.use('/:propertyId', express.static(path.join(__dirname, '../public')));

const server = app.listen(port, () => {
  console.log(`Proxy running at http://localhost:${port}/1/`);
});

