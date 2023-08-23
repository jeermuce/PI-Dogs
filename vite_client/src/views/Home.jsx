import React, { useEffect, useContext } from "react";
import Cards from "../components/Cards";
import Pagination from "../components/Pagination";
import axios from "axios";
import "./css/home.css";
import { AppContext } from "../App";

function Home() {
    const {
        allDogs,
        setAllDogs,
        units,
        setUnits,
        baseURL,
        location,
        showFilters,
        setShowFilters,
        details,
        setDetails,
        temperaments,
        setTemperaments,
        page,
        setPage,
    } = useContext(AppContext);

    return (
        <div className="homePage">
            <div className="emptyDivNav"></div>
            {/* check if alldogs[1].name exists, render Cards and Pagination if it does, renedrn loading... if it doesnt */}
            {allDogs[1] ? (
                <>
                    <Cards allDogs={allDogs} units={units} />
                    <Pagination />
                </>
            ) : (
                <div className="loading">Loading...</div>
            )}

            {/* 
            <Cards allDogs={allDogs} units={units} /> */}
            <Pagination />
        </div>
    );
}

export default Home;
