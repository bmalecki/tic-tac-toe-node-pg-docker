const socketIo = require('socket.io');
const db = require('./db');

function checkGameFields(fields) {
  let winner = null, fields = {};

  for (let i = 65; i <= 67; i += 1) {
    const x = n => fields[`${String.fromCharCode(i)}${n}`];
    if (x(1) && x(1) === x(2) && x(1) === x(3)) {
      winner = x(1);
    }
  }

  for (let i = 1; i <= 3; i += 1) {
    const x = n => fields[`${n}${i}`];
    if (x('A') && x('A') === x('B') && x('A') === x('C')) {
      winner = x('A');
    }
  }

  if (fields['A1'] && fields['A1'] === fields['B2'] && fields['A1'] === fields['C3']) {
    winner = fields['A1'];
  }

  if (fields['A3'] && fields['A3'] === fields['B2'] && fields['A3'] === fields['C1']) {
    winner = fields['A3'];
  }

  return { winner };
}


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
      const { winner, fields } = checkGameFields(await db.getFieldsOfRoom(roomid));

      if (winner) {
        console.log(`MOVE: ${playerId} won in room ${roomid}`);
        await db.changeGameStausToWinner(roomid, playerId)
        io.to(roomid).emit('END_GAME', { winner });
      } else {
        console.log(`MOVE: ${playerId} move in room ${roomid} field: ${fieldId}`);
        socket.to(roomid).emit('MOVE_OPPONET', { fieldId, roomid, playerId });
      }
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

