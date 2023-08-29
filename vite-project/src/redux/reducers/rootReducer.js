let initialState = {
    units: "metric", //from units toggle
    showFilters: false, //from filters toggle
    clear: false, //from searchbar

    //*******************************************************/

    allDogs: {
        totalCount: 174,
        dogs: [
            {
                id: "1",
                name: "Test Dog ",
                weight: "3 - 4",
                weight_imperial: "6.61 - 8.82",
                height: "1 - 2",
                height: "0.39 - 0.79",
                life_span: "5 - 6 years",
                image: "https://outwardhound.com/furtropolis/wp-content/uploads/2020/03/Doggo-Lingo-Post.jpg",
                temperaments: [
                    "Hello",
                    "I'm new",
                    "001",
                    "Adaptable",
                    "Adventurous",
                    "Aggressive",
                    "Agile",
                ],
                source: "database",
            },
        ],
    }, //from the api and database
    pages: { currentPage: 1, totalPages: 1 }, //!from the api and database

    //*******************************************************/

    search: { search: "" }, //!from the search
    searchDogs: { totalCount: 0, dogs: [] }, //!from the search
    searchPages: { currentPage: 1, totalPages: 1 }, //!from the search

    //*******************************************************/

    temperaments: { totalCount: 0, temperaments: [] }, //!from the api and database
    createdDog: {
        id: "",
        name: "",
        weight: "",
        height: "",
        life_span: "",
        image: "",
        weight_imperial: "",
        height_imperial: "",
        temperaments: [],
        source: "database",
    }, //!from the form
    creationErrors: {
        name: "",
        image: "",
        height_low: "",
        height_high: "",
        weight_low: "",
        weight_high: "",
        life_span_low: "",
        life_span_high: "",
        temperaments: "",
    }, //! from the form
};

function reducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
export default reducer;
