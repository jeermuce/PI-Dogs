import React from "react";
import "./css/navbar.css";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const currentlyAt = location.pathname.slice(0, 5);
    console.log(currentlyAt);

    const { units, setUnits } = useContext(AppContext);
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
                to="/about"
                style={{
                    display: location.pathname === "/about" ? "none" : "block",
                }}
            >
                About
            </Link>
            <Link
                to="/create"
                style={{
                    display: location.pathname === "/create" ? "none" : "block",
                }}
            >
                Create
            </Link>
            <div className="unitSelector">
                <label>Units: </label>
                <button
                    className="unitButton"
                    to="/home"
                    style={{
                        display:
                            currentlyAt !== "/home".slice(0, 5) &&
                            currentlyAt !== "/create".slice(0, 5) &&
                            currentlyAt !== "/details/".slice(0, 5)
                                ? "none"
                                : "block",
                    }}
                    onClick={() =>
                        setUnits(units === "metric" ? "imperial" : "metric")
                    }
                >
                    {units === "metric" ? "US" : "SI"}
                </button>
            </div>
        </div>
    );
}

export default Navbar;
