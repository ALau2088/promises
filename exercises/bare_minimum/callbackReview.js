/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err, null);
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
            callback(null, data.slice(0, index))
          } else {
            callback(null, data)
          }
        });
    }
  })
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, (err, response) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, response.statusCode);
    }
  })
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
