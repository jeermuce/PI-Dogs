import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const GET_DOG_NAMES = "GET_DOG_NAMES";
export const SET_SEARCH_NAME = "SET_SEARCH_NAME";
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const FILTERS_ON = "FILTERS_ON";
export const CREATE_DOG = "CREATE_DOG";
export const SET_PAGE = "SET_PAGE";
export const SET_UNITS = "SET_UNITS";

export function toggleUnits(units) {
    return { type: SET_UNITS, payload: units };
}
export function setSearchName(name) {
    return { type: SET_SEARCH_NAME, payload: name };
}
export function getDogsByName(name) {
    return async function (dispatch) {
        const response = await axios.get(
            `http://localhost:3001/dogs?name=${name}`
        );
        return dispatch({
            type: GET_DOGS_BY_NAME,
            payload: response.data.dogs,
        });
    };
}
export function setPage(page) {
    return { type: SET_PAGE, payload: page };
}
export function toggleFilters(filtersOn) {
    return { type: FILTERS_ON, payload: filtersOn };
}
export function createDog(dog) {
    if (dog) {
        return async function (dispatch) {
            const response = await axios.post(
                "http://localhost:3001/dogs",
                dog
            );
            return dispatch({ type: CREATE_DOG, payload: response.data });
        };
    }
    return { type: CREATE_DOG, payload: {} };
}
export function getDogNames() {
    return async function (dispatch) {
        const response = await axios.get("http://localhost:3001/dogs");
        const payload = response.data.dogs.map((dog) => (dog = dog.name));
        return dispatch({ type: GET_DOG_NAMES, payload });
    };
}

export function getDogs() {
    return async function (dispatch) {
        const response = await axios.get("http://localhost:3001/dogs");
        const payload = response.data.dogs;
        return dispatch({ type: GET_DOGS, payload });
    };
}

export function getTemperaments() {
    return async function (dispatch) {
        const response = await axios.get("http://localhost:3001/temperaments");
        return dispatch({ type: GET_TEMPERAMENTS, payload: response.data });
    };
}

export function getDogDetail(id) {
    if (id) {
        return async function (dispatch) {
            const response = await axios.get(
                "http://localhost:3001/dogs/" + id
            );
            return dispatch({ type: GET_DOG_DETAIL, payload: response.data });
        };
    }
    return { type: GET_DOG_DETAIL, payload: {} };
}
