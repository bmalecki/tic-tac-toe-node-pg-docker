const Koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');

const gameSocket = require('./gameSocket');

const jwt = require('./middlewares/jwt');
const routerProtected = require('./middlewares/router-protected');
const routerPublic = require('./middlewares/router-public');
const errorPages = require('./middlewares/error-pages');


const app = new Koa();
const http = require('http').Server(app.callback());

const io = gameSocket(http);

app
  .use(cors())
  .use(logger())
  .use(serve('/usr/static'))
  .use(errorPages)
  .use(bodyParser())
  .use(routerPublic.routes())
  .use(routerPublic.allowedMethods())
  .use(jwt)
  .use(async (ctx, next) => {
    ctx.io = io;
    await next();
  })
  .use(routerProtected.routes())
  .use(routerProtected.allowedMethods());


http.listen(8080, () => {
  console.log('App listen on *:8080');
});
