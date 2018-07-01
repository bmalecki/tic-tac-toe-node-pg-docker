const Router = require('koa-router');

const router = new Router();
const usersDb = require('../db');


const users = {
  getAllUsers: async (ctx, next) => {
    try {
      ctx.body = await usersDb.getAllUsers();
    } catch (e) {
      console.log(e);
      ctx.response.status = 401;
      ctx.body = 'unauthorized';
    } finally {
      await next();
    }
  },
  getUser: async (ctx, next) => {
    try {
      ctx.body = await usersDb.getUser(ctx.params.username);
    } catch (e) {
      console.log(e);
      ctx.response.status = 500;
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
  add: async (ctx, next) => {
    try {
      const { username, sign } = ctx.request.body;

      if (username !== ctx.state.user.username) {
        ctx.status = 400;
        return;
      }

      await usersDb.addRoom(username, sign)
        .then((result) => {
          if (result) {
            ctx.status = 201;
          } else {
            throw new Error();
          }
        });
    } catch (e) {
      console.log(e);
      ctx.response.status = 500;
      ctx.body = 'Internal error';
    } finally {
      await next();
    }
  },


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
  .get('/users', users.getAllUsers)
  .get('/users/:username', users.getUser)
  .get('/users/:username/rooms', users.getUserRooms)
  .get('/rooms', rooms.getAll)
  .post('/rooms', rooms.add)
  .get('/rooms/:roomid', rooms.getRoom);


module.exports = router;
