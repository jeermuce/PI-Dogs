const { Dog, Temperament } = require("../../db");
const { parseDbDog } = require("../../utils/parseDbDog");
const { axiosCaller } = require("../../utils/axiosCaller");
const { Op } = require("sequelize");
const { parseApiDogs } = require("../../utils/parseApiDogs");

async function getDogByName(name) {
    try {
        name = name.trim().toLowerCase();
        let dogs = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        dogs = dogs.map((dog) => dog.dataValues);
        let parsedDbDogs = dogs.map((dog) => {
            return parseDbDog(dog);
        });

        const response = await axiosCaller("name", name);

        apiDogs = parseApiDogs(response.data, "dogsByName");
        const totalCount = apiDogs.length + parsedDbDogs.length;
        !parsedDbDogs.length && (parsedDbDogs = ["No matches in database"]);
        !apiDogs.length && (apiDogs = ["No matches in API"]);

        dogs.sort();

        let totalDogs = [...parsedDbDogs, ...apiDogs];

        dogs = { dogs: totalDogs, totalCount };
        return dogs;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getDogByName,
};
