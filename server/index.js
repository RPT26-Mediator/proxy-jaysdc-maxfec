const path = require('path');
const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;

app.use('/:propertyId', express.static(path.join(__dirname, '../public')));

app.get('/details/:propertyId', (req, res) => {
  axios.get(`http://localhost:3003/details/${req.params.propertyId}/`)
    .then((details) => {
      res.send(details.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Proxy running at http://localhost:${port}/1/`);
});
