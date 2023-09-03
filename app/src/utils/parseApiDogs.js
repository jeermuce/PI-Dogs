function parseApiDogs(apiDogs, client) {
    try {
        const parsedDogs = [];
        for (let i = 0; i < apiDogs.length; i++) {
            const dog = apiDogs[i];
            if (client === "dogs" || client === "dogsByName") {
                parsedDogs.push(parseApiDog(dog, client));
            } else if (client === "temperaments") {
                parsedDogs.push({
                    temperaments: dog.temperament,
                });
            }
        }
        return parsedDogs;
    } catch (error) {
        throw error;
    }
}

function parseTemperaments(temperaments) {
    return !!temperaments ? temperaments.split(", ") : [];
}

function parseApiDog(apiDog, client) {
    try {
        let image;
        if (client === "dogs") {
            image = apiDog.image.url;
        } else if (client === "dogById" || client === "dogsByName") {
            image = `https://cdn2.thedogapi.com/images/${apiDog.reference_image_id}.jpg`;
        }

        return {
            id: apiDog.id,
            name: apiDog.name,
            weight: apiDog.weight.metric,
            weight_imperial: apiDog.weight.imperial,
            height: apiDog.height.metric,
            height_imperial: apiDog.height.imperial,
            life_span: apiDog.life_span,
            image,
            temperaments: parseTemperaments(apiDog.temperament),
            source: "api",
        };
    } catch (error) {
        throw error;
    }
}

module.exports = { parseApiDogs, parseApiDog };
