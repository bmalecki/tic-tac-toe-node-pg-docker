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

function info() {
  return new Promise((res, rej) => {
    pool.connect((err, client, done) => {
      if (err) {
        rej(new Error(`error fetching client from pool ${err}`));
      }
      client.query('SELECT $1::int AS number', ['5'], (queryErr, result) => {
        // call `done()` to release the client back to the pool
        done();

        if (err) {
          rej(new Error(`error running query ${queryErr}`));
        }
        console.log(result.rows[0].number);
        res(`Result from pg ${result.rows[0].number}`);
      });
    });
  });
}

module.exports = { info };
