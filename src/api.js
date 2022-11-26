const express = require('express');
const routes = require('./routes');
const { tokenValidation } = require('./middlewares/authentication');

// ...
const app = express();

app.use(express.json());

app.use('/login', routes.loginRoute);
app.use('/user', routes.userRoute);
app.use('/categories', tokenValidation, routes.categoryRoute);
app.use('/post', tokenValidation, routes.postRoute);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
