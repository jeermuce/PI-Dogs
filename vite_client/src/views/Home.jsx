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
        showFilters,
        setShowFilters,
        details,
        setDetails,
        temperaments,
        setTemperaments,
        page,
        setPage,
        createdDog,
        setCreatedDog,
        clear,
        setClear,
    } = useContext(AppContext);
    let currentDogs = allDogs;
    useEffect(() => {
        axios.get(`${baseURL}dogs?page=${page}`).then(({ data }) => {
            setAllDogs(data.dogs);
        });
        setClear(false);
    }, [page, createdDog, clear]);

    return (
        <div className="homePage">
            <div className="empty-div-nav-spacer"></div>
            {currentDogs[1] ? (
                <>
                    <Cards allDogs={currentDogs} units={units} />
                    <Pagination />
                </>
            ) : (
                <div className="loading">Loading...</div>
            )}
        </div>
    );
}

export default Home;
