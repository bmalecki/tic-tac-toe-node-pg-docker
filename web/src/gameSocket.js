const socketIo = require('socket.io');
const db = require('./db');

module.exports = (http) => {
  const io = socketIo(http);

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('CREATE_ROOM', ({ player, sign, roomid }) => {
      console.log(`CREATE_ROOM: ${player} as '${sign}' creates room ${roomid}`);
      socket.join(roomid);
    });

    socket.on('JOIN_ROOM', async ({ player, sign, roomid }, fn) => {
      const room = await db.getRoom(roomid);
      socket.join(roomid);
      console.log(`JOIN_ROOM: ${player} as '${sign}' joins to room ${roomid}`);
      io.in(roomid).emit('START_GAME', { ...room, gameStatus: room.game_status });
      fn();
    });

    socket.on('MOVE', async ({ fieldId, roomid, playerId }) => {
      await db.addFieldToRoom(roomid, playerId, fieldId);
      console.log(`MOVE: ${playerId} move in room ${roomid} field: ${fieldId}`);
      socket.to(roomid).emit('MOVE_OPPONET', { fieldId, roomid, playerId });
    });


    socket.on('destroy', () => {
      socket.disconnect(true);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });


  return io;
};

