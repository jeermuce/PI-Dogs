import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useContext } from "react";
import "./css/landing.css";
import { AppContext } from "../App";

function Landing() {
    const { setAllDogs, baseURL, setPage } = useContext(AppContext);

    return (
        <div className="landing">
            <Link to="/home">
                <button className="homeButton">Pounce</button>
            </Link>
        </div>
    );
}

export default Landing;
