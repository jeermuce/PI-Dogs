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

            image: {
                type: DataTypes.STRING,
                allowNull: false,
                isUrl: true,
                defaultValue: "https://i.imgur.com/gJqDFST.png",
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
