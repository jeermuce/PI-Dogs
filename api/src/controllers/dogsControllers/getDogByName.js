const { Dog, Temperament } = require("../../db");
const { parseDbDog } = require("../../utils/parseDbDog");
const { axiosCaller } = require("../../utils/axiosCaller");
const { Op } = require("sequelize");
const { parseApiDogs } = require("../../utils/parseApiDogs");

async function getDogByName(name, page) {
    try {
        console.log(name);
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

        apiDogs = await parseApiDogs(response.data, "dogsByName");
        !parsedDbDogs.length && (parsedDbDogs = ["No matches in DB"]);
        !apiDogs.length && (apiDogs = ["No matches in API"]);

        dogs = [...parsedDbDogs, ...apiDogs];
        dogs.sort();
        dogs = dogs.slice(0, 8);

        return dogs;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getDogByName,
};
