const logIntoLVS = require('./log-into-lvs');
const getUsers = require('../controllers/getUsers');


function loginUsers(args) {
  return new Promise(function(resolve, reject) {
    let i = 0;
    // args = Object.assign(args, {
    //   filter: { 'absent': false }
    // });
    // Object.assign(this, args);

    getUsers().then(res => {
      this.users = res;
      startLogin();
    }).catch((e) => {
      return false;
    });

    function iterator() {
      i++;
      startLogin();
    }

    function startLogin() {
      let {lvsUsername, lvsPassword} = this.users[i];
      logIntoLVS(lvsUsername, lvsPassword).then((res) => {
        checkStatus(false);
      }).catch(e => {
        checkStatus(true)
      })
    }

    function checkStatus(err) {
      if((i + 1) < this.users.length) {
        iterator();
      } else if (err) {
        reject('aww');
      } else {
        resolve('wee');
      }
    }
  });
}

module.exports = loginUsers;
