module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        username: type.STRING(100),
        email: type.STRING(100),
        password: type.STRING(255),
        role: type.INTEGER.UNSIGNED
    });
};