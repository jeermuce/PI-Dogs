import React from "react";
import "./filters.css";
import { useSelector, useDispatch } from "react-redux";
import {
    clearFilters,
    getDogs,
    getTemperaments,
    setFilters,
} from "../../redux/actions";
import { useEffect, useState } from "react";

function Filters() {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.reducer.temperaments);
    const filtersOn = useSelector((state) => state.reducer.filtersOn);
    const [orderDirection, setOrderDirection] = useState(true);
    const [orderBy, setOrderBy] = useState("name");
    const [showFromSource, setShowFromSource] = useState("all");
    const [showWithTemperament, setShowWithTemperament] = useState("all");

    function toggleOrder() {
        setOrderDirection(!orderDirection);
    }

    function handleApplyFilters() {
        const filters = {
            source: showFromSource,
            order: orderDirection,
            temperament: showWithTemperament,
            attribute: orderBy,
        };
        dispatch(setFilters(filters));
    }

    useEffect(() => {
        dispatch(getTemperaments());
    }, []);
    function handleClear() {
        dispatch(clearFilters());
    }
    return (
        <div className="filters">
            <div onClick={handleApplyFilters}>
                <select
                    name="showFromSource"
                    id="showFromSource"
                    onChange={(e) => setShowFromSource(e.target.value)}
                >
                    <option value="all">Source</option>
                    <option value="all">All</option>
                    <option value="api">Api</option>
                    <option value="database">Db</option>
                </select>
                <select
                    name="showWithTemperament"
                    id="showWithTemperament"
                    onChange={(e) => setShowWithTemperament(e.target.value)}
                >
                    <option value="all">Temperament</option>
                    <option value="all">All</option>

                    {temperaments.map((temperament, index) => (
                        <option key={index} value={temperament}>
                            {temperament}
                        </option>
                    ))}
                </select>
                <select
                    name="orderBy"
                    id="orderBy"
                    onChange={(e) => setOrderBy(e.target.value)}
                >
                    <option value="name">OrderBy</option>
                    <option value="name">Name</option>
                    <option value="weight">Weight</option>
                </select>
                <button className="order-button" onClick={() => toggleOrder()}>
                    {orderDirection ? "ASC" : "DESC"}
                </button>
            </div>
            <button className="clear-button" onClick={handleClear}>
                clear
            </button>
        </div>
    );
}

export default Filters;
