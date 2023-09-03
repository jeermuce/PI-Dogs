import React from "react";
import "./navbar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import bone from "../../assets/bone.png";
import Searchbar from "../searchbar/Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { createDog, toggleFilters, toggleUnits } from "../../redux/actions";
import home from "../../assets/home_symbol.svg";
import funnel from "../../assets/funnel.svg";
import plus from "../../assets/plus_symbol.svg";
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
            <div className="navbar-links">
                <NavLink to="/" className="landing-link">
                    <img src={bone} alt="logo" className="bone-logo-navbar" />
                </NavLink>
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
            </div>
            <div className="center-navbar">
                <Searchbar />
                <Link
                    to="/create"
                    onClick={() => {
                        dispatch(createDog());
                    }}
                >
                    <button className="navbar-button">
                        <img src={plus} alt="Create" className="navbar-icon" />
                    </button>
                </Link>
            </div>
            <div className="right-navbar">
                <div className="navbar-toggle-list">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexFlow: "row nowrap",
                            marker: "none",
                        }}
                    >
                        <label htmlFor="unit-button">Units:</label>
                        <button
                            className="unit-button"
                            style={
                                unitBool
                                    ? {
                                          backgroundColor: "var(--secondary)",
                                          aspectRatio: "1/1",
                                      }
                                    : {
                                          backgroundColor: "var(--background)",
                                          aspectRatio: "1/1",
                                      }
                            }
                            onClick={handleUnitToggle}
                        >
                            {unitBool ? "SI" : "US"}
                        </button>
                    </div>

                    <div>
                        <button
                            className="filter-button-navbar"
                            style={
                                filtersOn
                                    ? { backgroundColor: "var(--accent)" }
                                    : { backgroundColor: "var(--secondary)" }
                            }
                            onClick={handleFiltersToggle}
                        >
                            <img
                                className="navbar-icon"
                                src={funnel}
                                alt="filter-symbol"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
