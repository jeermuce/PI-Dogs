import React from "react";
import "./Searchbar.css";
import magnifier from "../../assets/magnifier.svg";
import cross from "../../assets/cross.svg";
import { Link } from "react-router-dom";

function Searchbar() {
    return (
        <div className="search-container_searchbar">
            <input
                type="text"
                placeholder="Search"
                className="search-input_searchbar"
            />
            <Link to="/home">
                <button className="button_searchbar">
                    <img
                        src={cross}
                        alt="cross"
                        className="button-icon_searchbar"
                        id="clear-button"
                    />
                </button>
            </Link>
            <Link to="/search">
                <button className="button_searchbar" id="search-button">
                    <img
                        src={magnifier}
                        alt="magnifier"
                        className="button-icon_searchbar"
                        id="search-button-icon"
                    />
                </button>
            </Link>
        </div>
    );
}

export default Searchbar;
