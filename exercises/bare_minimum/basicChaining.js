/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('./promiseConstructor');
var promisification = require('./promisification');

var fetchProfileAndWriteToFile = function (readFilePath, writeFilePath) {
  return new Promise(function (resolve, reject) {
    promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
      .then(function (data) {
        return promisification.getGitHubProfileAsync(data);
      })
      .then(function (data) {
        fs.writeFile(writeFilePath, JSON.stringify(data), (err) => {
          if (err) {
            reject(new Error('error writing file'));
          } else {
            resolve();
          }
        })
      })
      .catch(function (err) {
        console.log(err)
      })
  })
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
