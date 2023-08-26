const { Temperament } = require("../db.js");

async function addTemperamentsToDog(dog, temperaments) {
    if (temperaments && temperaments.length > 0) {
        try {
            const createdTemperaments = await Promise.all(
                temperaments.map(async (temperament) => {
                    console.log("temperament", temperament);
                    const [createdTemperament] = await Temperament.findOrCreate(
                        {
                            where: {
                                name: temperament,
                            },
                            defaults: {
                                name: temperament,
                                source: "database",
                            },
                        }
                    );
                    return createdTemperament;
                })
            );
            await dog.addTemperaments(createdTemperaments);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { addTemperamentsToDog };
