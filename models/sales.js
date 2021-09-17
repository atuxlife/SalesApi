module.exports = (sequelize, type) => {
    return sequelize.define('sale', {
        id: {
            type: type.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: type.INTEGER.UNSIGNED,
        total: type.INTEGER.UNSIGNED,
        datesale: type.DATE
    });
};