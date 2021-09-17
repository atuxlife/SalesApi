const router = require('express').Router();

const middlewares = require('./middlewares');
const apiProductsRouter = require('./api/products');
const apiUsersRouter = require('./api/users');
const apiSalesRouter = require('./api/sales');

router.use('/products', middlewares.checkToken, apiProductsRouter);
router.use('/sales', middlewares.checkToken, apiSalesRouter);
router.use('/users', apiUsersRouter);

module.exports = router;