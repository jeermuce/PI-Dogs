const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        "dog",
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            num: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
                isUrl: true,
                defaultValue: "https://imgur.com/a/fCKhvC3",
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                UNIQUE: true,
            },
            height: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "unknown",
            },
            height_imperial: {
                type: DataTypes.STRING,
                defaultValue: "unknown",
                allowNull: false,
            },
            weight: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "unknown",
            },
            weight_imperial: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "unknown",
            },
            life_span: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "unknown",
            },
        },
        {
            timestamps: false,
        }
    );
};
