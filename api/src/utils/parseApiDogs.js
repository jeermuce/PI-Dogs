function parseApiDogs(apiDogs, client) {
    function parseTemperaments(temperaments) {
        return !!temperaments && (temperamentsArray = temperaments.split(", "));
    }
    return apiDogs.map((dog) => {
        if (client === "dogs")
            return {
                id: dog.id,
                name: dog.name,
                weight: dog.weight.metric,
                weight_imperial: dog.weight.imperial,
                height: dog.height.metric,
                height_imperial: dog.height.imperial,
                life_span: dog.life_span,
                image: dog.image.url,
                temperaments: parseTemperaments(dog.temperament),
            };
        else if (client === "temperaments")
            return {
                temperaments: parseTemperaments(dog.temperament),
            };
    });
}
module.exports = { parseApiDogs };
