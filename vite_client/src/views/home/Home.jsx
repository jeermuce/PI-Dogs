import React, { Component, useEffect, useState } from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Pagination from "../../components/pagination/Pagination";
import Cards from "../../components/cards/Cards";
import Filters from "../../components/filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../redux/actions";

function Home() {
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.reducer.dogs.dogs);
    const filtersOn = useSelector((state) => state.reducer.filtersOn);
    const pageState = useSelector((state) => state.reducer.currentPage);
    useEffect(() => {
        dispatch(getDogs(pageState, 8));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageState]);
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

            <Cards dogs={dogs} />
            <Pagination />
        </div>
    );
}

export default Home;