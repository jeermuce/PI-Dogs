function sorter(a, b) {
    if (orderDirection === "ASC") {
        return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
        return a[orderBy] < b[orderBy] ? 1 : -1;
    }
}
module.exports = sorter;
