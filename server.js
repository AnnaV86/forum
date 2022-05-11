const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = 3010;
const db = router.db.__wrapped__.dailyPlanner;
server.use(middlewares);
server.use(jsonServer.bodyParser);
// server.use((req, res, next) => {
//   const db = router.db.__wrapped__.dailyPlanner;
//   if (req.method === 'DELETE') {
//     const id = req.url.match(/\d*$/g)[0];
//     const result = db.filter((el) => el.id !== id);
//     res.jsonp(result);
//   }

//   if (req.method === 'PUT') {
//     const id = req.url.match(/\d*$/g)[0];
//     console.log('body', req.body);
//     const result = db.map((el) => (el.id === id ? req.body : el));
//     console.log(result);
//     res.jsonp(result);
//   }

// if (req.method === 'POST') {
//   const result = db.concat(req.body);

//   res.jsonp(result);
// }

//   next();
// });

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running port ${PORT}`);
});
