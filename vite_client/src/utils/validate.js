function validate(input, name, errors, setErrors, form) {
    const errorMessages = {
        name: {
            empty: "mandatory",
            invalidFirstChar: "must start with a letter",
            overLong: "must be less than 50 characters",
            mustStartWithLetter: "must start with a letter",
        },
        image: {
            empty: "mandatory",
            invalidProtocol: "Invalid URL protocol",
            invalidUrl: "Invalid URL",
        },
        height_low: {
            empty: "mandatory",
            notNumber: "height_low must be a number",
            outOfRange: "must be positive",
            lessThanHigh: "must be less than height_high",
        },
        height_high: {
            empty: "mandatory",
            notNumber: "height_high must be a number",
            outOfRange: "must be positive",
            moreThanLow: "must be more than height_low",
        },
        weight_low: {
            empty: "mandatory",
            notNumber: "weight_low must be a number",
            outOfRange: "must be positive",
            lessThanHigh: "must be less than height_high",
        },
        weight_high: {
            empty: "mandatory",
            notNumber: "weight_high must be a number",
            outOfRange: "must be positive",
            moreThanLow: "must be more than height_low",
        },
        life_span_low: {
            empty: "mandatory",
            notNumber: "life_span_low must be a number",
            outOfRange: "must be positive",
            lessThanHigh: "must be less than height_high",
        },
        life_span_high: {
            empty: "mandatory",
            notNumber: "life_span_high must be a number",
            outOfRange: "must be positive",
            moreThanLow: "must be more than height_low",
        },
        temperaments: {
            empty: "pick/type one or more",
        },
    };

    let errorMessage = "";

    switch (name) {
        case "name":
            if (input === "") {
                errorMessage = errorMessages.name.empty;
            } else if (input[0] < "A" || input[0] > "z") {
                errorMessage = errorMessages.name.invalidFirstChar;
            } else if (input.length > 50) {
                errorMessage = errorMessages.name.overLong;
            } else if (input[0] < "A" && input[0] > "z") {
                errorMessage = errorMessages.name.mustStartWithLetter;
            }

            break;
        case "image":
            if (input === "") {
                errorMessage = errorMessages.image.empty;
            } else {
                try {
                    const url = new URL(input);

                    if (url.protocol !== "http:" && url.protocol !== "https:") {
                        errorMessage = errorMessages.image.invalidProtocol;
                    }
                } catch (error) {
                    errorMessage = errorMessages.image.invalidUrl;
                }
            }
            break;
        case "height_low":
            errorMessage = rangeGeneric(input, name);
            if (errorMessage === "") {
                if (input > form.height_high) {
                    errorMessage = errorMessages.height_low.lessThanHigh;
                }
            }
            break;

        case "height_high":
            errorMessage = rangeGeneric(input, name);
            if (errorMessage === "") {
                if (input < form.height_low) {
                    errorMessage = errorMessages.height_high.moreThanLow;
                }
            }
        case "weight_low":
            errorMessage = rangeGeneric(input, name);
            if (errorMessage === "") {
                if (input > form.weight_high) {
                    errorMessage = errorMessages.weight_low.lessThanHigh;
                }
            }
            break;
        case "weight_high":
            errorMessage = rangeGeneric(input, name);
            if (errorMessage === "") {
                if (input < form.weight_low) {
                    errorMessage = errorMessages.weight_high.moreThanLow;
                }
            }
            break;
        case "life_span_low":
            errorMessage = rangeGeneric(input, name);
            if (errorMessage === "") {
                if (input > form.life_span_high) {
                    errorMessage = errorMessages.life_span_low.lessThanHigh;
                }
            }
            break;
        case "life_span_high":
            errorMessage = rangeGeneric(input, name);
            if (errorMessage === "") {
                if (input < form.life_span_low) {
                    errorMessage = errorMessages.life_span_high.moreThanLow;
                }
            }
        case "temperaments":
            if (input === "") {
                errorMessage = errorMessages.temperaments.empty;
            }
            break;

        default:
            break;
    }
    setErrors({
        ...errors,
        [name]: errorMessage,
    });
}

export default validate;

function rangeGeneric(input, name) {
    if (input === "") {
        errorMessage = errorMessages[name].empty;
    } else if (isNaN(input)) {
        errorMessage = errorMessages[name].notNumber;
    } else if (input < 0) {
        errorMessage = errorMessages[name].outOfRange;
    }
    return errorMessage;
}
