const socketIo = require('socket.io');

module.exports = (http) => {
  const io = socketIo(http);

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join_room', (room) => {
      console.log("join to room ", room);
      socket.join(room);
    });


    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  setInterval(() => io.to('room1').emit('room message', 'what is going on, party people?'), 500);
};

