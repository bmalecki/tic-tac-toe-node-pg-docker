const koaJwt = require('koa-jwt');

const isRevoked = (ctx, decodedToken, token) => Promise.resolve(false);

module.exports = koaJwt({
  secret: 'secret', // Should not be hardcoded
  isRevoked,
});
