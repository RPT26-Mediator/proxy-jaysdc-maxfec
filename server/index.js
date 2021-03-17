const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use('/:propertyId', express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Proxy running at http://localhost:${port}/1/`);
});
