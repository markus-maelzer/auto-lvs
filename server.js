const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const publicPath = __dirname + '/public';
const port = process.env.PORT || 3001;

const lvs = require('./puppeteer/log-into-lvs');
const getUsersPromise = require('./controllers/getUsers');

getUsersPromise().then((res) => {
  console.log(res);
});

app.use(express.static(publicPath));
app.use(cors());
app.use(bodyParser.json('*/*'));

io.on('connection', socket => {
  console.log(`User with id ${socket.id} connected`);
  socket.on('disconnect', reason => {
    console.log(`User with id ${socket.id} disconnected`);
  })
})

server.listen(port, () => {
  console.log(`Server is definately not started on port ${port}`);
})