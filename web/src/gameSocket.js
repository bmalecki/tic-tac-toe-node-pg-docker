const socketIo = require('socket.io');

module.exports = (http) => {
  const io = socketIo(http);

  io.on('connection', (socket) => {
    console.log('a user connected');
  });
};
