const path = require('path');
const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;
const newRelic = require('newrelic');

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.use('/:propertyId', express.static(path.join(__dirname, '../public')));

app.get('/details/:propertyId', (req, res) => {
  axios.get(`http://3.142.136.159/details/${req.params.propertyId}`)
    .then((details) => {
      res.send(details.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/checkoutInformation/:propertyId', (req, res) => {
  axios.get(`http://3.16.113.225/checkoutInformation/${req.params.propertyId}/`)
    .then((details) => {
      res.send(details.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/:listingID/reviews', (req, res) => {
  axios.get(`http://localhost:3006/${req.params.listingID}/reviews`)
    .then((details) => {
      res.send(details.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/:propertyId/averageReviewsRating', (req, res) => {
  axios.get(`http://3.101.105.128:3006/${req.params.propertyId}/averageReviewsRating/`)
    .then((details) => {
      res.send(details.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/photos/:propertyId', (req, res) => {
  axios.get(`http://52.53.176.39:3002/photos/${req.params.propertyId}`)
    .then((details) => {
      res.send(details.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/:listingID/host', (req, res) => {
  axios.get(`http://13.57.41.115:3007/${req.params.listingID}/host`)
    .then((host) => {
      res.send(host.data);
    }).catch((error) => {
      console.log(error);
      res.send(error);
    });
});

const server = app.listen(port, () => {
  console.log(`Proxy running at http://localhost:${port}/1/`);
});
server.keepAliveTimeout = 61 * 1000;