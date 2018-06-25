const Koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const jwt = require('./middlewares/jwt');
const routerProtected = require('./middlewares/router-protected');
const routerPublic = require('./middlewares/router-public');
const errorPages = require('./middlewares/error-pages');


const app = new Koa();

app
  .use(logger())
  .use(serve('/usr/static'))
  .use(errorPages)
  .use(bodyParser())
  .use(routerPublic.routes())
  .use(routerPublic.allowedMethods())
  .use(jwt)
  .use(routerProtected.routes())
  .use(routerProtected.allowedMethods());


app.listen(8080, () => {
  console.info('App listen on 8080');
});
