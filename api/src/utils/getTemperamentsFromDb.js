const { Temperament } = require("../db.js");

async function getTemperamentsFromDb() {
    const temperaments = await Temperament.findAll({
        attributes: ["name", "id", "source"],
        order: [["name", "ASC"]],
    });
    const orderedTemperaments = temperaments;
    return {
        temperaments: orderedTemperaments,
        message: `${temperaments.length} temperaments found in database`,
    };
}

module.exports = {
    getTemperamentsFromDb,
};
