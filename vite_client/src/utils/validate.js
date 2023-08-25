function validate(input, name, errors, setErrors) {
    const errorMessages = {
        name: {
            empty: "mandatory",
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
        },
        height_high: {
            empty: "mandatory",
            notNumber: "height_high must be a number",
            outOfRange: "must be positive",
        },
        weight_low: {
            empty: "mandatory",
            notNumber: "weight_low must be a number",
            outOfRange: "must be positive",
        },
        weight_high: {
            empty: "mandatory",
            notNumber: "weight_high must be a number",
            outOfRange: "must be positive",
        },
        life_span_low: {
            empty: "mandatory",
            notNumber: "life_span_low must be a number",
            outOfRange: "must be positive",
        },
        life_span_high: {
            empty: "mandatory",
            notNumber: "life_span_high must be a number",
            outOfRange: "must be positive",
        },
        temperaments: {
            empty: "pick or type one or more",
        },
    };

    let errorMessage = "";

    switch (name) {
        case "name":
            if (input === "") {
                errorMessage = errorMessages.name.empty;
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
        case "height_high":
        case "weight_low":
        case "weight_high":
        case "life_span_low":
        case "life_span_high":
            if (input === "") {
                errorMessage = errorMessages[name].empty;
            } else if (isNaN(input)) {
                errorMessage = errorMessages[name].notNumber;
            } else if (input < 0) {
                errorMessage = errorMessages[name].outOfRange;
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
