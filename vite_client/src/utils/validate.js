function validate(input, name, errors, setErrors, form) {
    const errorMessages = {
        name: {
            empty: "mandatory",
            invalidFirstChar: "must start with a letter",
            overLong: "must be less than 50 characters",
        },
        image: {
            empty: "mandatory",
            invalidProtocol: "Invalid URL protocol",
            invalidUrl: "Invalid URL",
        },
        height_low: {
            empty: "mandatory",
            notNumber: "must be a number",
            outOfRange: "must be positive",
            lessThanHigh: "must be less than high",
            mustBeInteger: "must be an integer",
            overLong: "must be fewer than 4 digits",
        },
        height_high: {
            empty: "mandatory",
            notNumber: "must be a number",
            outOfRange: "must be positive",
            moreThanLow: "must be more than low",
            mustBeInteger: "must be an integer",
            overLong: "must be fewer than 4 digits",
        },
        weight_low: {
            empty: "mandatory",
            notNumber: "must be a number",
            outOfRange: "must be positive",
            lessThanHigh: "must be less than high",
            mustBeInteger: "must be an integer",
            overLong: "must be fewer than 4 digits",
        },
        weight_high: {
            empty: "mandatory",
            notNumber: "must be a number",
            outOfRange: "must be positive",
            moreThanLow: "must be more than low",
            mustBeInteger: "must be an integer",
            overLong: "must be fewer than 4 digits",
        },
        life_span_low: {
            empty: "mandatory",
            notNumber: "must be a number",
            outOfRange: "must be positive",
            lessThanHigh: "must be less than high",
            mustBeInteger: "must be an integer",
            overLong: "must be fewer than 4 digits",
        },
        life_span_high: {
            empty: "mandatory",
            notNumber: "must be a number",
            outOfRange: "must be positive",
            moreThanLow: "must be more than low",
            mustBeInteger: "must be an integer",
            overLong: "must be fewer than 4 digits",
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
            } else if (!/^[a-zA-Z]/.test(input)) {
                errorMessage = errorMessages.name.invalidFirstChar;
            } else if (input.length > 50) {
                errorMessage = errorMessages.name.overLong;
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
        case "weight_low":
        case "life_span_low":
            errorMessage = rangeGeneric(
                input,
                name,
                errorMessage,
                errorMessages
            );
            if (errorMessage === "") {
                const highValue = form[name.replace("_low", "_high")];
                if (Number(input) > Number(highValue) && highValue !== "") {
                    errorMessage = errorMessages[name].lessThanHigh;
                }
            }
            break;
        case "height_high":
        case "weight_high":
        case "life_span_high":
            errorMessage = rangeGeneric(
                input,
                name,
                errorMessage,
                errorMessages
            );
            if (errorMessage === "") {
                const lowValue = form[name.replace("_high", "_low")];
                if (Number(input) < Number(lowValue) && lowValue !== "") {
                    errorMessage = errorMessages[name].moreThanLow;
                }
            }
            break;
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

function rangeGeneric(input, name, errorMessage, errorMessages) {
    if (input === "") {
        errorMessage = errorMessages[name].empty;
    } else if (input.length > 4) {
        errorMessage = errorMessages[name].overLong;
    } else if (isNaN(input)) {
        errorMessage = errorMessages[name].notNumber;
    } else if (input < 0) {
        errorMessage = errorMessages[name].outOfRange;
    } else if (input.includes(".")) {
        errorMessage = errorMessages[name].mustBeInteger;
    }
    return errorMessage;
}
