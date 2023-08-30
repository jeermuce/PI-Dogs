import React, { Component, useEffect, useState } from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Pagination from "../../components/pagination/Pagination";
import Cards from "../../components/cards/Cards";
import Filters from "../../components/filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getDogsByName } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let dogs = useSelector((state) => state.reducer.dogs);
    const searchName = useSelector((state) => state.reducer.searchName);
    const filtersOn = useSelector((state) => state.reducer.filtersOn);
    const pageState = useSelector((state) => state.reducer.currentPage);
    const createdDog = useSelector((state) => state.reducer.createdDog);
    useEffect(() => {}, [createdDog]);
    useEffect(() => {
        if (searchName) dispatch(getDogsByName(searchName));
        else dispatch(getDogs());
    }, [pageState, searchName]);

    let pageDogs = dogs.slice((pageState - 1) * 8, pageState * 8);

    return (
        <div className="home-page">
            <Navbar filtersOn={filtersOn} />
            {filtersOn ? (
                <Filters />
            ) : (
                <div
                    style={{
                        height: "0",
                    }}
                ></div>
            )}

            <Cards dogs={pageDogs} />
            <Pagination />
        </div>
    );
}

export default Home;
