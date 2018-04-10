const loginUsers = require('./');

loginUsers().then((res) => {
  console.log(res);
  process.exit(0);
}).catch((e) => {
  console.log(e);
  process.exit(1);
});
