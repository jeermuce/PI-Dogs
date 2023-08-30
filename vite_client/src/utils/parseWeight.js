function parseWeight(weight) {
    if (weight.includes("-")) {
        const min = parseInt(weight.split("-")[0]);
        const max = parseInt(weight.split("-")[1]);
        return { min, max };
    } else {
        const min = parseInt(weight);
        const max = parseInt(weight);
        return { min, max };
    }
}
export default parseWeight;
