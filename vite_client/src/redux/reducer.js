import {
    CREATE_DOG,
    FILTERS_ON,
    GET_DOGS,
    GET_DOG_DETAIL,
    GET_TEMPERAMENTS,
    SEARCH_DOGS,
    SET_PAGE,
    SET_UNITS,
} from "./actions";

const initialState = {
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
};
function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: payload,
            };
        case SEARCH_DOGS:
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
        default:
            return state;
    }
}

export default reducer;
