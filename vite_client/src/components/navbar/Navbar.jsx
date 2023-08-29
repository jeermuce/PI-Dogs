import React, { useRef } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import paw from "../../assets/paw.png";
import Searchbar from "../searchbar/Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilters, toggleUnits } from "../../redux/actions";

function Navbar() {
    const unitBool = useSelector((state) => state.reducer.units);
    const location = useLocation().pathname;
    const dispatch = useDispatch();
    const filtersOn = useSelector((state) => state.reducer.filtersOn);

    function handleFiltersToggle() {
        dispatch(toggleFilters(!filtersOn));
    }
    function handleUnitToggle() {
        dispatch(toggleUnits(!unitBool));
    }

    return (
        <div className="navbar">
            <Link to="/">
                <img src={paw} alt="logo" className="paw-logo-navbar" />
            </Link>
            <ul className="navbar-links">
                {location !== "/home" && (
                    <li>
                        <Link to="/home">
                            <img src="" alt="home" />
                        </Link>
                    </li>
                )}
                {location !== "/create" && (
                    <li>
                        <Link to="/create">Create</Link>
                    </li>
                )}
            </ul>
            <Searchbar />
            <ul className="navbar-links">
                <li>
                    <button
                        className="unit-button"
                        style={
                            unitBool
                                ? { backgroundColor: "var(--secondary)" }
                                : { backgroundColor: "var(--background)" }
                        }
                        onClick={handleUnitToggle}
                    >
                        {unitBool ? "SI" : "US"}
                    </button>
                </li>
                <li>
                    <button
                        className="filter-button-navbar"
                        style={
                            filtersOn
                                ? { backgroundColor: "var(--accent)" }
                                : { backgroundColor: "var(--secondary)" }
                        }
                        onClick={handleFiltersToggle}
                    >
                        <img src="" alt="FI" />
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
