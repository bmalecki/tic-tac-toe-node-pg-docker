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
        SELECT roomid, o, x FROM rooms WHERE o=$1 OR x=$1)
      SELECT roomid,
        CASE 
          WHEN x=$1 THEN 'x'
          WHEN o=$1 THEN 'o'
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
        INSERT INTO rooms (${s}) 
          SELECT CAST($1 AS VARCHAR) WHERE EXISTS 
            (SELECT * FROM users WHERE username=$1)`;

        if (sign === 'o') return doQuery(createQuery('o'), [username]);
        else if (sign === 'x') return doQuery(createQuery('x'), [username]);
      }

      throw new Error('Forbiden sign');
    })().then(result => result !== undefined && result.rowCount === 1),

  addUserToRoom: (username, sign, roomid) =>
    (() => {
      if (sign === 'o' || sign === 'x') {
        const createQuery = (s1, s2) => doQuery(
          `UPDATE rooms SET ${s1} = $1
            WHERE roomid = $2 
            AND ${s2} NOT LIKE $1 
            AND ${s1} IS NULL
            AND EXISTS (SELECT * FROM users where username=$1)`,
          [username, roomid],
        );

        if (sign === 'o') return createQuery('o', 'x');
        else if (sign === 'x') return createQuery('x', 'o');
      }

      throw new Error('Forbiden sign');
    })().then(result => result !== undefined && result.rowCount === 1),

  getAllRooms: () =>
    doQuery('SELECT roomid, o, x FROM rooms')
      .then(result => result.rows),

  getAvailableRooms: () =>
    doQuery('SELECT roomid, o, x FROM rooms WHERE o IS NULL OR x IS NULL')
      .then(result => result.rows),

  getRoom: roomid =>
    doQuery('SELECT roomid, o, x FROM rooms WHERE roomid=$1', [roomid])
      .then(result => result.rows[0]),
};

module.exports = exportFunc;
