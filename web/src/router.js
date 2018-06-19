const Router = require('koa-router');

const router = new Router();
const usersDb = require('./pool');

const db = {
  tobi: { name: 'tobi', species: 'ferret' },
  loki: { name: 'loki', species: 'ferret' },
  jane: { name: 'jane', species: 'ferret' },
};

const pets = {
  list: async (ctx, next) => {
    const names = Object.keys(db);
    ctx.body = `pets: ${names.join(', ')}\n`;
    await next();
  },

  show: (ctx) => {
    const pet = db[ctx.params.name];
    if (!pet) ctx.throw('cannot find that pet', 404);
    ctx.body = `${pet.name} is a ${pet.species}`;
  },
};

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
};

router
  .get('/pets', pets.list)
  .get('/pets/:name', pets.show)
  .get('/users', users.getFirst)
  .get('/users/:username', users.get);

module.exports = router;
