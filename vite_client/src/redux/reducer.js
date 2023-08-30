import {
    CLEAR_FILTERS,
    CREATE_DOG,
    FILTERS_ON,
    FILTER_DOGS,
    GET_DOGS,
    GET_DOGS_BY_NAME,
    GET_DOG_DETAIL,
    GET_DOG_NAMES,
    GET_TEMPERAMENTS,
    SET_COUNT,
    SET_FILTERS,
    SET_PAGE,
    SET_SEARCH_NAME,
    SET_UNITS,
} from "./actions";
import parseWeight from "../utils/parseWeight";
const initialState = {
    dogNames: [],
    units: "metric",
    currentPage: 1,
    createdDog: {},
    filtersOn: false,
    filters: {
        source: "all",
        order: "all",
        temperament: "all",
        attribute: "all",
    },
    dogs: [],
    dogsBackup: [],
    dogDetail: {},
    temperaments: [],
    searchName: "",
};
function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case FILTER_DOGS:
            const { source, order, temperament, attribute } = state.filters;
            let dogs = [...state.dogsBackup];

            let filteredDogs = dogs.filter((dog) => typeof dog === "object");
            let stringArray = dogs.filter((dog) => typeof dog === "string");
            if (source !== "all") {
                filteredDogs = filteredDogs.filter(
                    (dog) => dog.source === source
                );
            }
            if (temperament !== "all") {
                filteredDogs = filteredDogs.filter((dog) =>
                    dog.temperaments.includes(temperament)
                );
            }
            if (attribute === "name") {
                if (order) {
                    filteredDogs = filteredDogs.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                } else {
                    filteredDogs = filteredDogs.sort((a, b) =>
                        b.name.localeCompare(a.name)
                    );
                }
            }
            if (attribute === "weight") {
                if (order) {
                    filteredDogs = filteredDogs.sort(
                        (a, b) =>
                            parseWeight(a.weight).min -
                            parseWeight(b.weight).min
                    );
                } else {
                    filteredDogs = filteredDogs.sort(
                        (a, b) =>
                            parseWeight(b.weight).max -
                            parseWeight(a.weight).max
                    );
                }
            }
            if (filteredDogs.length === 0) {
                filteredDogs = ["No matches found"];
            }
            filteredDogs = [...stringArray, ...filteredDogs];
            return {
                ...state,
                dogs: filteredDogs,
                count: filteredDogs.length ? filteredDogs.length : 1,
            };
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: initialState.filters,
                dogs: state.dogsBackup,
                count: state.dogsBackup.length,
            };
        case SET_COUNT:
            return {
                ...state,
                count: payload,
            };
        case SET_FILTERS:
            return {
                ...state,
                filters: payload,
            };
        case SET_SEARCH_NAME:
            return {
                ...state,
                searchName: payload,
            };
        case GET_DOGS_BY_NAME:
            return {
                ...state,
                dogs: payload,
                dogsBackup: payload,
                count: payload.length,
            };

        case GET_DOGS:
            return {
                ...state,
                dogs: payload,
                dogsBackup: payload,
                count: payload.length,
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
