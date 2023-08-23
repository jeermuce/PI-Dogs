import React, { useState } from "react";
import "./css/navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import Filters from "./Filters";
import { AppContext } from "../App";
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
    function shouldRenderUnits() {
        if (
            currentlyAt === "/home".slice(0, 5) ||
            currentlyAt === "/create".slice(0, 5) ||
            currentlyAt === "/details/".slice(0, 5)
        ) {
            return true;
        }
        return false;
    }

    return (
        <div className="navbar">
            <Link
                to="/"
                style={{
                    display: location.pathname === "/" ? "none" : "block",
                }}
            >
                Landing
            </Link>
            <Link
                to="/home"
                style={{
                    display: location.pathname === "/home" ? "none" : "block",
                }}
            >
                Home
            </Link>
            <Link
                to="/create"
                style={{
                    display: location.pathname === "/create" ? "none" : "block",
                }}
            >
                Create
            </Link>
            <div
                className="unitSelector"
                style={{
                    display: shouldRenderUnits() ? "block" : "none",
                }}
            >
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
            <button className="button-s" onClick={toggleFilters}>
                Filters
            </button>
        </div>
    );
}

export default Navbar;
