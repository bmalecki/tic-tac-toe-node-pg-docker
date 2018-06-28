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
  getUserPassword: (username) => {
    return doQuery('SELECT passwd AS string from users where username LIKE $1', [username])
      .then(result => result.rows[0].string);
  },

  addUser: (username, password) => {
    return doQuery('INSERT INTO users VALUES ($1, $2)', [username, password])
      .then(result => result !== undefined && result.rowCount === 1);
  },

  getAllRooms: () => {
    return doQuery('SELECT roomid, o, x FROM rooms')
      .then(result => result.rows);
  },

  getAvailableRooms: () => {
    return doQuery('SELECT roomid, o, x FROM rooms where o IS NULL OR x IS NULL')
      .then(result => result.rows);
  },
};



module.exports = exportFunc;
