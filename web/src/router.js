const Router = require('koa-router');

const router = new Router();
const usersDb = require('./pool');


const users = {
  getFirst: async (ctx, next) => {
    try {
      ctx.body = await usersDb.getUser('first');
    } catch (e) {
      console.log(e);
      ctx.response.status = 401;
      ctx.body = 'unauthorized';
    } finally {
      await next();
    }
  },
  get: async (ctx, next) => {
    try {
      ctx.body = await usersDb.getUser(ctx.params.username);
    } catch (e) {
      console.log(e);
      ctx.response.status = 401;
      ctx.body = 'unauthorized';
    } finally {
      await next();
    }
  },
  login: async (ctx, next) => {
    console.log(ctx);
  },
};

router
  .get('/users', users.getFirst)
  .get('/users/:username', users.get)
  .post('users/login', users.login);

module.exports = router;
