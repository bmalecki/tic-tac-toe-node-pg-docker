const Koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static');

const pool = require('./pool');
const router = require('./router');

const app = new Koa();

app
  .use(logger())
  .use(serve('/usr/static'))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx) => {
    ctx.body = (ctx.body || 'HI ') + await pool.info();
  });


app.listen(8080, () => {
  console.info('App listen on 8080');
});
