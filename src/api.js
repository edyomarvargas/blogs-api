const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('./routes');
const { tokenValidation } = require('./middlewares/authentication');

const app = express();

app.use(express.json());

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/login', routes.loginRoute);
app.use('/user', routes.userRoute);
app.use('/categories', tokenValidation, routes.categoryRoute);
app.use('/post', tokenValidation, routes.postRoute);

module.exports = app;
