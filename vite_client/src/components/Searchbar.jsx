import React, { useEffect } from "react";
import "./css/searchbar.css";
import magnifier from "../assets/magnifier.svg";
import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";

function Searchbar() {
    const navigate = useNavigate();
    const location = useLocation();
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
        createdDog,
        setCreatedDog,
        clear,
        setClear,
    } = useContext(AppContext);
    const [search, setSearch] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setSearch(value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (location.pathname !== "/home") {
            navigate("/home");
            return;
        }
        axios.get(`${baseURL}dogs?name=${search}`).then((res) => {
            console.log(res.data);
            setAllDogs(res.data);
        });
    }
    function handleClear(e) {
        e.preventDefault();
        setSearch("");
        setClear(true);
    }
    useEffect(() => {
        if (clear) {
            axios.get(`${baseURL}dogs`).then((res) => {
                console.log(res.data);
                setAllDogs(res.data);
            });
            setClear(false);
        }
    }, [clear]);
    return (
        <section className="searchbar-section">
            <input
                className="searchbar-input"
                type="text
            "
                name="search"
                value={search}
                onChange={handleChange}
                placeholder="Search for a dog...
            
            "
            ></input>
            <button className="searchbar-button-clear" onClick={handleClear}>
                clear
            </button>
            <button
                className="searchbar-button-submit"
                type="submit"
                onClick={handleSubmit}
            >
                <img
                    src={magnifier}
                    alt="magnifier"
                    className="magnifier-image-svg"
                />
            </button>
        </section>
    );
}

export default Searchbar;
