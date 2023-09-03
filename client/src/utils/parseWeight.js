function parseWeight(weight) {
    //returns the average weight of a dog
    //dog may have "a - b" or "a" or "" as its weight
    if (weight) {
        if (weight.includes("-")) {
            const weights = weight.split("-");
            const average = (Number(weights[0]) + Number(weights[1])) / 2;
            return average;
        } else {
            return Number(weight);
        }
    }
    return 0;
}
export default parseWeight;
