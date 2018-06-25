const koaJwt = require('koa-jwt');

const isRevoked = (token, ctx, user) => Promise.resolve(false);

module.exports = koaJwt({
  secret: 'secret', // Should not be hardcoded
  isRevoked,
});
