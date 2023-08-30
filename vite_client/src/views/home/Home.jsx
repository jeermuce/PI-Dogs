import React, { Component, useEffect, useState } from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Pagination from "../../components/pagination/Pagination";
import Cards from "../../components/cards/Cards";
import Filters from "../../components/filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import {
    filterDogs,
    getDogs,
    getDogsByName,
    setCount,
} from "../../redux/actions";
import { useNavigate } from "react-router-dom";

function Home() {
    const dispatch = useDispatch();
    let dogs = useSelector((state) => state.reducer.dogs);
    const count = useSelector((state) => state.reducer.count);
    const searchName = useSelector((state) => state.reducer.searchName);
    const filtersOn = useSelector((state) => state.reducer.filtersOn);
    const filters = useSelector((state) => state.reducer.filters);
    const pageState = useSelector((state) => state.reducer.currentPage);
    const createdDog = useSelector((state) => state.reducer.createdDog);
    const [pageDogs, setPageDogs] = useState([]);
    useEffect(() => {
        !count && dispatch(getDogs());
    }, [count]);

    useEffect(() => {
        if (
            searchName !== "" &&
            searchName !== undefined &&
            searchName !== null
        )
            dispatch(getDogsByName(searchName));
        else if (!filtersOn && createdDog.name) dispatch(getDogs());
        else if (
            (searchName === "" ||
                searchName === undefined ||
                searchName === null ||
                pageState !== 1) &&
            !filtersOn
        ) {
            dispatch(getDogs());
        }
    }, [searchName, createdDog]);
    useEffect(() => {
        if (createdDog.name) {
            dispatch(getDogs());
        }
    }, [createdDog]);

    useEffect(() => {
        setPageDogs(dogs.slice((pageState - 1) * 8, pageState * 8));
    }, [dogs, pageState, searchName]);

    useEffect(() => {
        filtersOn ? dispatch(filterDogs()) : null;
    }, [filters, filtersOn]);

    return (
        <div className="home-page">
            <Navbar filtersOn={filtersOn} />
            {filtersOn ? (
                <Filters />
            ) : (
                <div
                    style={{
                        height: "0",
                    }}
                ></div>
            )}

            <Cards dogs={pageDogs} />
            <Pagination />
        </div>
    );
}

export default Home;
