module.exports = (sequelize, type) => {
    return sequelize.define('sales_det', {
        id: {
            type: type.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        sale_id: type.INTEGER.UNSIGNED,
        product_id: type.INTEGER.UNSIGNED,
        cant: type.INTEGER.UNSIGNED,
        subtotal: type.FLOAT(10,2).UNSIGNED
    });
};