function parseApiDogs(apiDogs, client) {
    return apiDogs.map((dog) => {
        if (client === "dogs" || client === "dogsByName") {
            return parseApiDog(dog, client);
        } else if (client === "temperaments")
            return {
                temperaments: dog.temperament,
            };
    });
}
function parseTemperaments(temperaments, client) {
    return !!temperaments && (temperamentsArray = temperaments.split(", "));
}
function parseApiDog(apiDog, client) {
    return {
        id: apiDog.id,
        name: apiDog.name,
        weight: apiDog.weight.metric,
        weight_imperial: apiDog.weight.imperial,
        height: apiDog.height.metric,
        height_imperial: apiDog.height.imperial,
        life_span: apiDog.life_span,
        image:
            (client === "dogs" && apiDog.image.url) ||
            (client === "dogsByName" && apiDog.image.url) ||
            (client === "dogById" &&
                `https://cdn2.thedogapi.com/images/${apiDog.reference_image_id}.jpg`),
        temperaments: parseTemperaments(apiDog.temperament),
    };
}

module.exports = { parseApiDogs, parseApiDog };
