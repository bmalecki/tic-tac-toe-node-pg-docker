const Router = require('koa-router');
const usersDb = require('../db');
const jwt = require('jsonwebtoken');
const secret = require('../secret');

const router = new Router();

const users = {
  login: async (ctx) => {
    const { username, password } = ctx.request.body;
    console.log('aa');
    await usersDb.getUserPassword(username)
      .then((userPassword) => {
        if (userPassword === password) {
          ctx.status = 200;
          ctx.body = { message: 'OK' };
          ctx.cookies.set('token', jwt.sign({
            username,
          }, secret, { expiresIn: '3h' }));
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        ctx.status = 401;
        ctx.body = {
          message: 'Authentication failed',
        };
      });
  },
};

router
  .post('/login', users.login);

module.exports = router;
