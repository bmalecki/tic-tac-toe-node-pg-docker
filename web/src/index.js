const Koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static');

const router = require('./router');

const app = new Koa();

app
  .use(logger())
  .use(serve('/usr/static'))
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(8080, () => {
  console.info('App listen on 8080');
});
