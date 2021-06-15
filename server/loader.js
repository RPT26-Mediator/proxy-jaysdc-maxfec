const fs = require('fs');
const fetch = require('node-fetch');
const Promise = require('bluebird');
const exists = Promise.promisify(fs.stat);
const Ppath = require('path');

const loadBundle = function(cache, item, filename) {
  // add a small delay to ensure pipe has closed
  setTimeout(() => {
    cache[item] = require(filename).default;
  }, 0);
};

const fetchBundles = (path, services, suffix = '', require = false) => {
  Object.keys(services).forEach(item => {
    const filename = `${path}/${item}${suffix}.js`;
    console.log('filename: ', filename);
    exists(filename)
      .then(() => {
        require ? loadBundle(services, item, filename) : null;
      })
      .catch(err => {
        console.log('in catch block, filename: ', filename);
        if (err.code === 'ENOENT') {
          // const url = `${services[item]}${suffix}.js`;
          const url = `${services[item]}${suffix}.js`;

          console.log(`Fetching: ${url}`);
          // see: https://www.npmjs.com/package/node-fetch
          fetch(url)
            .then(res => {
              // console.log('path: ', path);
              const dest = fs.createWriteStream(Ppath.join(__dirname, filename))
              dest.on('error', function(err) {
                console.error('fs error: ', err);
                dest.end();
            });
              console.log('created a writestream for filename: ', filename);
              res.body.pipe(dest);
              res.body.on('end', () => {
                require ? loadBundle(services, item, filename) : null;
              });
            })
            .catch((err) => {
              console.error('fetching error: ', err);
            })
        } else {
          console.log('WARNING: Unknown fs error');
        }
      });
  });
};

module.exports = (clientPath, serverPath, services) => {
  fetchBundles(clientPath, services);
  fetchBundles(serverPath, services, '-server', true);

  return services;
};
