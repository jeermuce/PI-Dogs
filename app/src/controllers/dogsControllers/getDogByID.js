const { parseDbDog } = require("../../utils/parseDbDog");
const { parseApiDog } = require("../../utils/parseApiDogs");
const { axiosCaller } = require("../../utils/axiosCaller");
const { Dog, Temperament } = require("../../db");

async function getDogByID(id) {
    console.log("getDogByID");
    try {
        if (isNaN(id)) {
            let dog = await Dog.findByPk(id, {
                include: {
                    model: Temperament,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            });
            dog = parseDbDog(dog.dataValues);
            return dog;
        }
        const response = await axiosCaller("id", id);

        if (Object.keys(response.data).length === 0) {
            throw new Error(`Dog with id ${id} not found`);
        }
        return parseApiDog(response.data, "dogById");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getDogByID,
};
