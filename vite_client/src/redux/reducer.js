import {
    CREATE_DOG,
    FILTERS_ON,
    GET_DOGS,
    GET_DOG_DETAIL,
    GET_DOG_NAMES,
    GET_TEMPERAMENTS,
    SET_PAGE,
    SET_SEARCH_NAME,
    SET_UNITS,
} from "./actions";

const initialState = {
    dogNames: [],
    units: "metric",
    currentPage: 1,
    createdDog: {},
    filtersOn: false,
    filters: {},
    count: 0,
    dogs: {
        totalCount: 0,
        dogs: [],
    },
    dogDetail: {},
    temperaments: {
        totalCount: 0,
        temperaments: [],
    },
    searchName: "",
};
function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_SEARCH_NAME:
            return {
                ...state,
                searchName: payload,
            };
        case GET_DOGS:
            return {
                ...state,
                dogs: payload,
            };

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: payload,
            };
        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: payload,
            };
        case CREATE_DOG:
            return {
                ...state,
                createdDog: payload,
            };
        case FILTERS_ON:
            return {
                ...state,
                filtersOn: payload,
            };
        case SET_PAGE:
            return {
                ...state,
                currentPage: payload,
            };
        case SET_UNITS:
            return {
                ...state,
                units: payload,
            };
        case GET_DOG_NAMES:
            return {
                ...state,
                dogNames: payload,
            };
        default:
            return state;
    }
}

export default reducer;
