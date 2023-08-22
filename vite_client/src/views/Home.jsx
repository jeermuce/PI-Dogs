import React, { useEffect, useContext } from "react";
import Cards from "../components/Cards";
import Pagination from "../components/Pagination";
import axios from "axios";
import "./css/home.css";
import { AppContext } from "../App";

function Home() {
    const { allDogs, setAllDogs, units, setUnits, baseURL, location } =
        useContext(AppContext);

    return (
        <div className="homePage">
            <div className="emptyDivNav"></div>
            <Cards allDogs={allDogs} units={units} />
            <Pagination />
        </div>
    );
}

export default Home;
