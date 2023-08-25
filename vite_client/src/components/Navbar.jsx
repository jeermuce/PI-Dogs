import React, { useState } from "react";
import "./css/navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import Filters from "./Filters";
import Searchbar from "./Searchbar";
import { AppContext } from "../App";
import paw from "../assets/paw.png";
function Navbar() {
    const location = useLocation();
    const currentlyAt = location.pathname.slice(0, 5);

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
    } = useContext(AppContext);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="navbar">
            <NavLink
                to="/"
                style={{
                    display: location.pathname === "/" ? "none" : "block",
                    height: "100%",
                }}
            >
                <img src={paw} alt="paw-logo" className="paw-logo-navbar" />
            </NavLink>
            <NavLink
                to="/home"
                style={{
                    display: location.pathname === "/home" ? "none" : "block",
                }}
            >
                Home
            </NavLink>
            <NavLink
                to="/create"
                style={{
                    display: location.pathname === "/create" ? "none" : "block",
                }}
            >
                Create
            </NavLink>
            <Searchbar />

            {currentlyAt !== "/deta" && (
                <button
                    className="filter-button-navbar"
                    onClick={toggleFilters}
                >
                    Filters
                </button>
            )}
            <div className="unitSelector">
                <label>Units: </label>
                <button
                    className="unitButton"
                    to="/home"
                    onClick={() =>
                        setUnits(units === "metric" ? "imperial" : "metric")
                    }
                >
                    {units === "metric" ? "SI" : "US"}
                </button>
            </div>
        </div>
    );
}

export default Navbar;
