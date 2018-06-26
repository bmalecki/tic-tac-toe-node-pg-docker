const Router = require('koa-router');

const router = new Router();
const usersDb = require('../db');


const users = {
  getFirst: async (ctx, next) => {
    try {
//      ctx.body = await usersDb.getUser('first');
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
      ctx.body = await usersDb.getUserPassword(ctx.params.username);
      ctx.body = ctx.state;
    } catch (e) {
      console.log(e);
      ctx.response.status = 401;
      ctx.body = 'unauthorized';
    } finally {
      await next();
    }
  },
};

router
  .get('/users', users.getFirst)
  .get('/users/:username', users.get);


module.exports = router;
