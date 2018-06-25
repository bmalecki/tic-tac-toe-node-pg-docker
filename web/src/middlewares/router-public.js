const Router = require('koa-router');
const usersDb = require('../db');
const jwt = require('jsonwebtoken');

const router = new Router();


const users = {
  login: async (ctx) => {
    const { username, password } = ctx.request.body;

    if (await usersDb.getUserPassword(username) === password) {
      ctx.status = 200;
      ctx.body = {
        token: jwt.sign({
          username, message: 'OK',
        }, 'secret'),
      };
    } else {
      ctx.status = 401;
      ctx.body = {
        message: 'Authentication failed',
      };
    }
  },
};

router
  .post('/users/login', users.login);

module.exports = router;
