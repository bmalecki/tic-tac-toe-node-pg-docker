const socketIo = require('socket.io');

module.exports = (http) => {
  const io = socketIo(http);

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join_room', ({ player, sign, roomid }) => {
      console.log(`${player} as '${sign}' joins to room ${roomid}`);
      socket.join(roomid);
    });

    socket.on('destroy', () => {
      socket.disconnect(true);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  setInterval(() => io.to('room1').emit('room message', 'what is going on, party people?'), 500);
  setInterval(() => io.emit('msg', 'what is going on, party people?'), 500);

  return io;
};

