import React from "react";
import "./Navbar.css";
import paw from "../../assets/paw.png";
import { Link } from "react-router-dom";
import Searchbar from "../searchbar/Searchbar";
import funnel from "../../assets/funnel.svg";

function Navbar() {
    let units = "metric";
    return (
        <nav>
            <Link to="/" className="logo_navbar">
                <img
                    src={paw}
                    alt="logo"
                    style={{
                        width: "1.7rem",
                        height: "1.7rem",
                    }}
                />
            </Link>
            <ul>
                <li>
                    <Link to="/home" className="nav-link_navbar">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/create" className="nav-link_navbar">
                        Create
                    </Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Searchbar />
                </li>
                <li>
                    <button className="toggle-button_navbar">
                        <img
                            src={funnel}
                            alt="filters-toggle"
                            className="filters-toggle-icon_navbar"
                            id="filters-toggle-icon_navbar"
                        />
                    </button>
                </li>
                <li>
                    <button
                        className="toggle-button_navbar"
                        id="units-button_navbar"
                    >
                        {units === "metric" ? <span>SI</span> : <span>US</span>}
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
