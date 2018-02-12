const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const userDataPath = path.join(__dirname, '../data/users.json')

const getUsersCallback = (callback) => {
  let users;
  fs.readFile(userDataPath, (err, data) => {
    users = _.filter(JSON.parse(data), {'absent': false});
    if(typeof callback === 'function') {
      callback(users);
    }
  })
}


const getUsersPromise = () => new Promise((resolve, reject) => {
  fs.readFile(userDataPath, (err, data) => {
    users = _.filter(JSON.parse(data), {'absent': false});
    resolve(users);
  })
})

module.exports = getUsersPromise;
