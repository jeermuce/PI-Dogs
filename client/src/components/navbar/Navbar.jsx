import React from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import paw from "../../assets/paw.png";
import Searchbar from "../searchbar/Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { createDog, toggleFilters, toggleUnits } from "../../redux/actions";
import home from "../../assets/home_symbol.svg";
import { getDogDetail } from "../../redux/actions";
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
    function handleClick() {
        dispatch(getDogDetail());
    }

    return (
        <div className="navbar">
            <Link to="/">
                <img src={paw} alt="logo" className="paw-logo-navbar" />
            </Link>
            <Link to="/">
                <p>Landing</p>
            </Link>
            <ul className="navbar-links">
                {location !== "/home" && (
                    <Link to="/home">
                        <button className="navbar-button" onClick={handleClick}>
                            <img
                                src={home}
                                alt="Home"
                                className="navbar-icon"
                            />
                        </button>
                    </Link>
                )}

                <Link
                    to="/create"
                    onClick={() => {
                        dispatch(createDog());
                    }}
                >
                    <button className="navbar-button">Create</button>
                </Link>
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
                        Units: {unitBool ? "SI" : "US"}
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
                        Filters
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
