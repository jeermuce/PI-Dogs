async function dogBodyParser(dog) {
    const {
        name, //string
        height_low, //number
        height_high, //number
        height_unit, //imperial or metric
        weight_low, //number
        weight_high, //number
        weight_unit, //imperial or metric
        life_span_low, //number
        life_span_high, //number
        image, //url
        temperaments, //array of strings
    } = dog;

    const [weight, weight_imperial] = rangeConverter(
        weight_low,
        weight_high,
        weight_unit,
        "weight"
    );
    const [height, height_imperial] = rangeConverter(
        height_low,
        height_high,
        height_unit,
        "height"
    );
    const life_span = `${life_span_low} - ${life_span_high}`;
    const parsedDog = {
        name,
        height,
        height_imperial,
        weight,
        weight_imperial,
        life_span,
        image,
        temperaments,
    };
    return parsedDog;
}

function rangeConverter(low, high, unit, type) {
    let measurement = "";
    let measurement_imperial = "";
    let conversionFactor = 0;
    !unit && unit === "metric";
    type === "weight"
        ? (conversionFactor = 0.45359237)
        : (conversionFactor = 2.54);
    switch (unit) {
        case "imperial":
            const low_metric = Number((low * conversionFactor).toFixed(2));
            const high_metric = Number((high * conversionFactor).toFixed(2));
            measurement = `${low_metric} - ${high_metric}`;
            measurement_imperial = `${low} - ${high}`;
            return [measurement, measurement_imperial];

        default:
            const low_imperial = Number((low / conversionFactor).toFixed(2));
            const high_imperial = Number((high / conversionFactor).toFixed(2));
            measurement = `${low} - ${high}`;
            measurement_imperial = `${low_imperial} - ${high_imperial}`;
            return [measurement, measurement_imperial];
    }
}

module.exports = { dogBodyParser };
