import React from "react";
import "./css/pagination.css";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "../App";
import axios, { all } from "axios";
function Pagination() {
    const [pages, setPages] = useState(1);

    const {
        allDogs,
        setAllDogs,
        units,
        setUnits,
        baseURL,
        location,
        showFilters,
        setShowFilters,
        details,
        setDetails,
        temperaments,
        setTemperaments,
        page,
        setPage,
    } = useContext(AppContext);
    //allows us to change the page by changing the params.page in the url

    return (
        <div className="pagination">
            <button
                disabled={page === 1}
                style={
                    page === 1
                        ? {
                              backgroundColor: "grey",
                              color: "white",
                              aspectRatio: "1.5/1",
                          }
                        : { aspectRatio: "1.5/1" }
                }
                onClick={() => {
                    setPage(1);
                }}
            >
                {"<<"}
            </button>
            <button
                style={
                    page === 1
                        ? {
                              backgroundColor: "grey",
                              color: "white",
                              aspectRatio: "2/1",
                          }
                        : { aspectRatio: "2/1" }
                }
                onClick={() => {
                    setPage(page - 1);
                }}
                disabled={page === 1}
            >
                {"<"}
            </button>

            <button
                disabled={page <= 2}
                style={
                    page <= 2
                        ? {
                              backgroundColor: "grey",
                              color: "white",
                              aspectRatio: "1/1",
                          }
                        : { aspectRatio: "1/1" }
                }
                onClick={() => {
                    if (page > 2) setPage(page - 2);
                    else setPage(1);
                }}
            >
                {page > 2 ? page - 2 : ""}
            </button>
            <button
                disabled={page <= 1}
                style={
                    page <= 1
                        ? {
                              backgroundColor: "grey",
                              color: "white",
                              aspectRatio: "1/1",
                          }
                        : { aspectRatio: "1/1" }
                }
                onClick={() => {
                    if (page > 1) setPage(page - 1);
                    else setPage(1);
                }}
            >
                {page > 1 ? page - 1 : ""}
            </button>

            <button style={{ width: "4rem", cursor: "default" }}>
                {page} of {pages}
            </button>
            <button
                disabled={page + 1 > pages}
                style={
                    page + 1 > pages
                        ? {
                              backgroundColor: "grey",
                              color: "white",
                              aspectRatio: "1/1",
                          }
                        : { aspectRatio: "1/1" }
                }
                onClick={() => {
                    if (page + 1 <= pages) setPage(page + 1);
                    else setPage(pages);
                }}
            >
                {page + 1 <= pages ? page + 1 : ""}
            </button>
            <button
                disabled={page + 2 > pages}
                style={
                    page + 2 > pages
                        ? {
                              backgroundColor: "grey",
                              color: "white",
                              aspectRatio: "1/1",
                          }
                        : { aspectRatio: "1/1" }
                }
                onClick={() => {
                    if (page + 2 <= pages) setPage(page + 2);
                    else setPage(pages);
                }}
            >
                {page + 2 <= pages ? page + 2 : ""}
            </button>
            <button
                style={
                    allDogs.length < 8
                        ? {
                              backgroundColor: "grey",
                              color: "white",
                              aspectRatio: "2/1",
                          }
                        : { aspectRatio: "2/1" }
                }
                disabled={allDogs.length < 8}
                onClick={() => {
                    setPage(page + 1);
                    if (page >= pages) {
                        setPages(pages + 1);
                    }
                }}
            >
                {">"}
            </button>
            <button
                disabled={page === pages}
                style={
                    page === pages
                        ? {
                              backgroundColor: "grey",
                              color: "white",
                              aspectRatio: "1.5/1",
                          }
                        : { aspectRatio: "1.5/1" }
                }
                onClick={() => {
                    setPage(pages);
                }}
            >
                {">>"}
            </button>
        </div>
    );
}

export default Pagination;
