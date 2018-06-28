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
  getUserRooms: async (ctx, next) => {
    try {
      ctx.body = await usersDb.getUserRooms(ctx.params.username);
    } catch (e) {
      console.log(e);
      ctx.response.status = 401;
      ctx.body = 'unauthorized';
    } finally {
      await next();
    }
  },
};

const rooms = {
  getAll: async (ctx, next) => {
    try {
      if (Object.keys(ctx.query).length === 0) {
        ctx.body = await usersDb.getAllRooms();
      } else if (ctx.query.free === '') {
        ctx.body = await usersDb.getAvailableRooms();
      } else {
        ctx.response.status = 400;
        ctx.body = 'Wrong query';
      }
    } catch (e) {
      console.log(e);
      ctx.response.status = 500;
      ctx.body = 'Internal error';
    } finally {
      await next();
    }
  },
  getRoom: async (ctx, next) => {
    try {
      ctx.body = await usersDb.getRoom(ctx.params.roomid);
    } catch (e) {
      ctx.response.status = 204;
    } finally {
      await next();
    }
  },
};


router
  .get('/users', users.getFirst)
  .get('/users/:username', users.get)
  .get('/users/:username/rooms', users.getUserRooms)
  .get('/rooms', rooms.getAll)
  .get('/rooms/:roomid', rooms.getRoom);


module.exports = router;
