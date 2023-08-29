import React from "react";
import "./searchbar.css";
import magnifier from "../../assets/magnifier.svg";
import cross from "../../assets/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { searchDogs } from "../../redux/actions";

function Searchbar() {
    const page = useSelector((state) => state.reducer.currentPage);
    console.log(page);
    const dispatch = useDispatch();
    function handleSearch(e) {
        const name = e.target.value;

        dispatch(searchDogs(e.target.value, page, 8));
    }
    return (
        <div className="searchbar-section">
            <input
                type="text"
                className="searchbar-input"
                onChange={handleSearch}
            />
            <button className="searchbar-button-clear">
                <img src={cross} alt="clear-icon" className="searchbar-icon" />
            </button>
            <button className="searchbar-button-submit">
                <img
                    src={magnifier}
                    alt="search-icon"
                    className="searchbar-icon"
                />
            </button>
        </div>
    );
}

export default Searchbar;
