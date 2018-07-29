const socketIo = require('socket.io');
const db = require('./db');

function checkGameFields(fields) {
  let winner = null;
  let winnerFields = [];

  for (let i = 65; i <= 67; i += 1) {
    const coord = n => `${String.fromCharCode(i)}${n}`;
    const x = n => fields[coord(n)];
    if (x(1) && x(1) === x(2) && x(1) === x(3)) {
      winner = x(1);
      winnerFields = [coord(1), coord(2), coord(3)];
    }
  }

  for (let i = 1; i <= 3; i += 1) {
    const coord = n => `${n}${i}`;
    const x = n => fields[coord(n)];
    if (x('A') && x('A') === x('B') && x('A') === x('C')) {
      winner = x('A');
      winnerFields = [coord('A'), coord('B'), coord('C')];
    }
  }

  if (fields.A1 && fields.A1 === fields.B2 && fields.A1 === fields.C3) {
    winner = fields.A1;
    winnerFields = ['A1', 'B2', 'C3'];
  }

  if (fields.A3 && fields.A3 === fields.B2 && fields.A3 === fields.C1) {
    winner = fields.A3;
    winnerFields = ['A3', 'B2', 'C1'];
  }

  return { winner, winnerFields };
}


module.exports = (http) => {
  const io = socketIo(http);

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('INIT', ({ user }) => {
      console.log(`INIT: init user: ${user}`);
      socket.join(`user_${user}`);
    });

    socket.on('CREATE_ROOM', ({ player, sign, roomid }) => {
      console.log(`CREATE_ROOM: ${player} as '${sign}' creates room ${roomid}`);
      socket.join(`room_${roomid}`);
      socket.in(`user_${player}`).emit('USER_CREATED_ROOM');
    });

    socket.on('JOIN_ROOM', async ({ player, sign, roomid }, fn) => {
      const room = await db.getRoom(roomid);
      socket.join(`room_${roomid}`);
      console.log(`JOIN_ROOM: ${player} as '${sign}' joins to room ${roomid}`);
      io.in(`room_${roomid}`).emit('START_GAME', { ...room, gameStatus: room.game_status });
      fn();
    });

    socket.on('MOVE', async ({ fieldId, roomid, playerId }) => {
      await db.addFieldToRoom(roomid, playerId, fieldId);
      const { winner, winnerFields } = checkGameFields(await db.getFieldsOfRoom(roomid));

      if (winner) {
        console.log(`MOVE: ${playerId} won in room ${roomid}`);
        await db.changeGameStausToWinner(roomid, playerId, winnerFields)
        io.in(`room_${roomid}`).emit('END_GAME', { winner });
      } else {
        console.log(`MOVE: ${playerId} move in room ${roomid} field: ${fieldId}`);
        socket.to(`room_${roomid}`).emit('MOVE_OPPONENT', { fieldId, roomid, playerId });
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

