module.exports = (sequelize, type) => {
    return sequelize.define('product', {
        id: {
            type: type.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        numlote: type.STRING(10),
        nombre: type.STRING(100),
        precio: type.FLOAT(10,2).UNSIGNED,
        cantdisp: type.INTEGER.UNSIGNED,
        fechaing: type.DATE
    });
};