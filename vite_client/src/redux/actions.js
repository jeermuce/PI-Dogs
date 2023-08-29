import axios from "axios";
export const GET_DOGS = "GET_DOGS";
export const SEARCH_DOGS = "SEARCH_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const FILTERS_ON = "FILTERS_ON";
export const CREATE_DOG = "CREATE_DOG";
export const SET_PAGE = "SET_PAGE";
export const SET_UNITS = "SET_UNITS";

export function toggleUnits(units) {
    return { type: SET_UNITS, payload: units };
}

export function setPage(page) {
    console.log("setPage", page);
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

export function getDogs(page, batchSize) {
    if (!batchSize) {
        return async function (dispatch) {
            const response = await axios
                .get("http://localhost:3001/dogs")
                .then((res) => {
                    return res.data;
                });
            const payload = {
                totalCount: response.totalCount,
                dogs: response.dogs.map((dog) => (dog = { name: dog.name })),
            };
            console.log("payload", payload);

            return dispatch({ type: GET_DOGS, payload });
        };
    }
    return async function (dispatch) {
        const response = await axios
            .get("http://localhost:3001/dogs")
            .then((res) => {
                return res.data;
            });
        const payload = {
            totalCount: response.totalCount,
            dogs: response.dogs.slice(
                (page - 1) * batchSize,
                (page - 1) * batchSize + batchSize
            ),
        };

        return dispatch({ type: GET_DOGS, payload });
    };
}

export function searchDogs(name, page, batchSize) {
    return async function (dispatch) {
        const response = await axios
            .get("http://localhost:3001/dogs?name=" + name)
            .then((res) => {
                return res.data;
            });
        const payload = {
            totalCount: response.totalCount,
            dogs: response.dogs.slice(
                (page - 1) * batchSize,
                (page - 1) * batchSize + batchSize
            ),
        };
        console.log("payload", payload);

        return dispatch({ type: SEARCH_DOGS, payload });
    };
}
export function getTemperaments() {
    return async function (dispatch) {
        const response = await axios.get("http://localhost:3001/temperaments");
        return dispatch({ type: GET_TEMPERAMENTS, payload: response.data });
    };
}

export function getDogDetail(id) {
    return async function (dispatch) {
        const response = await axios.get("http://localhost:3001/dogs/" + id);
        return dispatch({ type: GET_DOG_DETAIL, payload: response.data });
    };
}
