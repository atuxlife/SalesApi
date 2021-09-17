const { Sequelize, Op } = require('sequelize');

const ProductModel = require('./models/products');
const UserModel = require('./models/users');
const SaleModel = require('./models/sales');
const SaleDetModel = require('./models/sales_det');

const sequelize = new Sequelize('salesapi','root','AZ92adx$!', {
    host: 'localhost',
    dialect: 'mysql'
});

const Product = ProductModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Sale = SaleModel(sequelize, Sequelize);
const SaleDet = SaleDetModel(sequelize, Sequelize);

sequelize.sync({ force: false})
    .then(() => {
        console.log('Tablas sincronizadas');
    });

module.exports = {
    Op,
    Product,
    User,
    Sale,
    SaleDet
};