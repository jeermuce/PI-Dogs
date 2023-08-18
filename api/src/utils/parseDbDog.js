function parseDbDog(dog) {
    const parsedTemperaments = dog.temperaments.map(
        (temperament) => temperament.name
    );
    return {
        id: dog.id,
        name: dog.name,
        weight: dog.weight,
        weight_imperial: dog.weight_imperial,
        height: dog.height,
        height_imperial: dog.height_imperial,
        life_span: dog.life_span,
        image: dog.image,
        temperaments: parsedTemperaments,
    };
}
module.exports = { parseDbDog };
