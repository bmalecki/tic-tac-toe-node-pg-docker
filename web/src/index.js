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

app
  .use(cors())
  .use(logger())
  .use(serve('/usr/static'))
  .use(errorPages)
  .use(bodyParser())
  .use(routerPublic.routes())
  .use(routerPublic.allowedMethods())
  .use(jwt)
  .use(routerProtected.routes())
  .use(routerProtected.allowedMethods());

gameSocket(http);

http.listen(8080, () => {
  console.log('App listen on *:8080');
});
