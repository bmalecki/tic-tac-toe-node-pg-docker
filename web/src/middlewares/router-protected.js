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
  deleteUser: async (ctx, next) => {
    try {
      const { username } = ctx.params;

      if (username !== ctx.state.user.username) {
        ctx.response.status = 401;
        ctx.body = 'unauthorized';
        return;
      }

      const rowCount = await usersDb.removeUser(username);

      if (rowCount === 0) {
        ctx.response.status = 404;
      } else if (rowCount === 1) {
        ctx.response.status = 200;
      } else {
        throw new Error();
      }
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
      const { sign } = ctx.request.body;
      const { username } = ctx.state.user;

      await usersDb.addRoom(username, sign)
        .then((result) => {
          if (result !== undefined && result.rows.length === 1) {
            ctx.status = 201;
            ctx.body = { ...result.rows[0] };
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

  addUser: async (ctx, next) => {
    try {
      const { username, sign, roomid } = ctx.request.body;

      if (ctx.state.user.username !== username) {
        ctx.response.status = 401;
        ctx.body = 'Unauthorized';
        return;
      }
      await usersDb.addUserToRoom(username, sign, roomid)
        .then((result) => {
          if (result) {
            ctx.status = 201;
          } else {
            throw new Error('Wrong params');
          }
        });
    } catch (e) {
      console.log(e.message);
      ctx.response.status = 500;
      ctx.body = `Internal error: ${e.message}`;
    } finally {
      await next();
    }
  },


  getAll: async (ctx, next) => {
    try {
      if (Object.keys(ctx.query).length === 0) {
        ctx.body = await usersDb.getAllRooms();
      } else if (ctx.query.free === '' && ctx.query.available !== '') {
        ctx.body = await usersDb.getFreeRooms();
      } else if (ctx.query.available === '') {
        ctx.body = await usersDb.getAvailableRooms(ctx.state.user.username);
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

const user = {
  getUsername: async (ctx) => {
    ctx.body = { username: ctx.state.user.username };
  },
};


router
  .get('/users', users.getAllUsers)
  .get('/users/:username', users.getUser)
  .delete('/users/:username', users.deleteUser)
  .get('/users/:username/rooms', users.getUserRooms)
  .get('/rooms', rooms.getAll)
  .post('/rooms', rooms.add)
  .put('/rooms', rooms.addUser)
  .get('/rooms/:roomid', rooms.getRoom)
  .get('/user', user.getUsername);


module.exports = router;
