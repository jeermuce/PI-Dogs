let initialState = {
    allDogs: { totalCount: 0, dogs: [] }, //from the api and database
    temperaments: { totalCount: 0, temperaments: [] }, //from the api and database
    search: { search: "" }, //from the search
    searchDogs: { totalCount: 0, dogs: [] }, //from the search
    dog: {}, //from the form
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
export default rootReducer;
