const Router = require('koa-router');
const usersDb = require('../db');
const jwt = require('jsonwebtoken');
const secret = require('../secret');

const router = new Router();

const users = {
  login: async (ctx) => {
    const { username, password } = ctx.request.body;

    await usersDb.getUserPassword(username)
      .then((userPassword) => {
        if (userPassword === password) {
          ctx.status = 200;
          ctx.body = {
            username,
            token: jwt.sign({
              username,
            }, secret, { expiresIn: '3 h' }),
          };
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
  addUser: async (ctx, next) => {
    next();
    const { username, password } = ctx.request.body;

    await usersDb.addUser(username, password)
      .then((result) => {
        if (result) {
          ctx.status = 201;
          ctx.body = {
            username,
            token: jwt.sign({
              username,
            }, secret, { expiresIn: '3h' }),
          };
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        ctx.status = 500;
        ctx.body = {
          message: 'Registiation failed',
        };
      });
  },

};

router
  .post('/login', users.login)
  .post('/users', users.addUser);

module.exports = router;
