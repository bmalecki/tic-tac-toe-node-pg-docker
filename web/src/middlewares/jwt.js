const koaJwt = require('koa-jwt');
const secret = require('../secret');


const isRevoked =
  (ctx, decodedToken, token) => // eslint-disable-line no-unused-vars
    Promise.resolve(false);

module.exports = koaJwt({
  secret,
  cookie: 'token',
  isRevoked,
}).unless({ method: 'OPTIONS' });
