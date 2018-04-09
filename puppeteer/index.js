const logIntoLVS = require('./log-into-lvs');
const getUsers = require('../controllers/getUsers');


function loginUsers(args) {
  let i = 0;
  let users;
  // args = Object.assign(args, {
  //   filter: { 'absent': false }
  // });
  // Object.assign(this, args);
  if(!this.users) {
    getUsers().then(res => {
      this.users = res;
      console.log('Users:', this.users);
      startLogin();
    });
  } else {
    console.log('Users:', this.users);
    startLogin();
  }

  function iterator() {
    i++;
    startLogin();
  }

  function startLogin() {
    console.log('test1', this.users);
    console.log('test2', this.users[i]);
    console.log('test3', i);
    let {lvsUsername, lvsPassword} = this.users[i];
    logIntoLVS(lvsUsername, lvsPassword).then((res) => {
      checkStatus();
    }).catch(e => {
      checkStatus()
      console.log(e);
    })
  }

  function checkStatus() {
    if(i <= this.users.length) {
      iterator();
    }
  }
}

module.exports = loginUsers;
