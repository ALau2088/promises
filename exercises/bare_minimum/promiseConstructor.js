/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function (filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      } else {
        var response = fs.createReadStream(filePath)
        var firstLine;
        response.on('data', (chunk) => {
          //console.log('line 18', chunk.toString())
          data = chunk.toString()
          index = chunk.indexOf('\n');
          response.close()
        })
          .on('close', () => {
            if (index !== -1) {
              resolve(data.slice(0, index))
            } else {
              resolve(data)
            }
          });
      }
    })
  })
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function (url) {
  return new Promise(function (resolve, reject) {
    request(url, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.statusCode);
      }
    })
  })
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
