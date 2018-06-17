const Router = require('koa-router');

const router = new Router();

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

router
  .get('/pets', pets.list)
  .get('/pets/:name', pets.show);

module.exports = router;
