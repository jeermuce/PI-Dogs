import React, { useEffect } from "react";
import "./searchbar.css";
import magnifier from "../../assets/magnifier.svg";
import cross from "../../assets/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, setPage, setSearchName } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

function Searchbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchName = useSelector((state) => state.reducer.searchName);

    function handleSearch(e) {
        const name = e.target.value;
        dispatch(setSearchName(name));
    }
    function handleClear() {
        dispatch(setSearchName(""));
        dispatch(setPage(1));
        dispatch(getDogs());
        document.querySelector(".searchbar-input").value = "";
    }

    return (
        <div className="searchbar-section">
            <input
                type="text"
                className="searchbar-input"
                onChange={handleSearch}
            />
            <button className="searchbar-button-clear" onClick={handleClear}>
                <img src={cross} alt="clear-icon" className="searchbar-icon" />
            </button>

            <button
                className="searchbar-button-submit"
                onClick={() => navigate(`/home`)}
            >
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
