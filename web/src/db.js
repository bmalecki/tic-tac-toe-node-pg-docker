const pg = require('pg');

const config = {
  host: 'pg', // Server hosting the postgres database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

pool.on('error', (err, client) => {
  console.error('idle client error', client, err.message, err.stack);
});

async function doQuery(query, parms) {
  return new Promise((res, rej) => {
    pool.connect((err, client, done) => {
      if (err) {
        rej(new Error(`error fetching client from pool ${err}`));
      }
      client.query(query, parms, (queryErr, result) => {
        done();
        if (err) {
          rej(new Error(`error running query ${queryErr}`));
        }
        res(result);
      });
    });
  });
}

const GET_ROOM_QUERY = 'SELECT roomid, player1, player2, game_status, board FROM rooms';

const exportFunc = {
  getUser: username =>
    doQuery('SELECT username from users where username LIKE $1', [username])
      .then(result => result.rows[0]),

  getAllUsers: () =>
    doQuery('SELECT username from users')
      .then(result => result.rows),

  getUserPassword: username =>
    doQuery('SELECT passwd AS string from users where username LIKE $1', [username])
      .then(result => result.rows[0].string),

  getUserRooms: username => doQuery(`
      WITH user_rooms AS (
        ${GET_ROOM_QUERY} WHERE player1=$1 OR player2=$1)
      SELECT roomid, game_status, player1, player2,
        CASE 
          WHEN player1=$1 THEN 'x'
          WHEN player2=$1 THEN 'o'
        END as sign
      FROM user_rooms
    `, [username])
    .then(result => result.rows),

  addUser: (username, password) =>
    doQuery('INSERT INTO users VALUES ($1, $2)', [username, password])
      .then(result => result !== undefined && result.rowCount === 1),

  removeUser: username =>
    doQuery('DELETE FROM users WHERE username LIKE $1', [username])
      .then(result => result.rowCount),


  addRoom: (username, sign) =>
    (() => {
      if (sign === 'o' || sign === 'x') {
        const createQuery = s => `
        INSERT INTO rooms (${s}, game_status) 
          SELECT CAST($1 AS VARCHAR), 'new' WHERE EXISTS 
            (SELECT * FROM users WHERE username=$1)
        RETURNING roomid`;

        if (sign === 'o') return doQuery(createQuery('player2'), [username]);
        else if (sign === 'x') return doQuery(createQuery('player1'), [username]);
      }

      throw new Error('Forbiden sign');
    })().then(result => result),

  addUserToRoom: (username, sign, roomid) =>
    (() => {
      if (sign === 'o' || sign === 'x') {
        const createQuery = (s1, s2) => doQuery(
          `UPDATE rooms SET ${s1} = $1, game_status = 'move_player1'
            WHERE roomid = $2 
            AND ${s2} NOT LIKE $1 
            AND ${s1} IS NULL
            AND EXISTS (SELECT * FROM users where username=$1)`,
          [username, roomid],
        );

        if (sign === 'o') return createQuery('player2', 'player1');
        else if (sign === 'x') return createQuery('player1', 'player2');
      }

      throw new Error('Forbiden sign');
    })().then(result => result !== undefined && result.rowCount === 1),

  getAllRooms: () =>
    doQuery(GET_ROOM_QUERY)
      .then(result => result.rows),

  getFreeRooms: () =>
    doQuery(`${GET_ROOM_QUERY} WHERE player1 IS NULL OR player2 IS NULL`)
      .then(result => result.rows),

  getAvailableRooms: user =>
    doQuery(`${GET_ROOM_QUERY} WHERE
     (player2 IS NULL AND player1 NOT LIKE $1) OR (player1 IS NULL AND player2 NOT LIKE $1)`, [user])
      .then(result => result.rows),

  getRoom: roomid =>
    doQuery(`${GET_ROOM_QUERY} WHERE roomid=$1`, [roomid])
      .then(result => result.rows[0]),
};

module.exports = exportFunc;
