import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./pagination.css";
import { setPage } from "../../redux/actions";
function Pagination({ cardsPerPage }) {
    const dispatch = useDispatch();
    const pageState = useSelector((state) => state.reducer.currentPage);
    let totalCount = useSelector((state) => state.reducer.count);
    const totalPages = Math.ceil(totalCount / cardsPerPage) || 1;
    const pages = [];
    const [currentPage, setCurrentPage] = useState(pageState);

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    useEffect(() => {
        if (currentPage !== pageState && currentPage <= totalPages) {
            dispatch(setPage(currentPage));
        }
        if (currentPage > totalPages || currentPage < 1) {
            setCurrentPage(1);
        }
    }, [currentPage, pageState, totalPages]);

    function handlePageChange(e) {
        setCurrentPage(e.target.value);
    }
    function pageButtonsGenerator(maxButtons) {
        function renderPageButton(page, currentPage, totalPages) {
            if (currentPage > totalPages - Math.ceil(maxButtons / 2) && page >= totalPages - maxButtons + 1) {
                return true;
            }
            if (currentPage < Math.ceil(maxButtons / 2) && page <= maxButtons) {
                return true;
            }
            if (Math.abs(currentPage - page) < Math.ceil(maxButtons / 2)) {
                return true;
            }
            return false;
        }

        const pagesToRender = pages.filter((page) =>
            renderPageButton(page, currentPage, totalPages)
        );

        return pagesToRender.map((page, index) => {
            return (
                <button
                    onClick={handlePageChange}
                    key={index}
                    value={page}
                    className={`${page == currentPage ? "active-page" : "inactive-page"} item`}
                >
                    {page}
                </button >
            );
        });
    }

    return (
        <div className="pagination">
            <button
                className="item"
                onClick={handlePageChange}
                value={1}
                disabled={currentPage == 1}
            >
                {"<<"}
            </button>
            <button
                className="item"
                onClick={handlePageChange}
                value={currentPage - 1}
                disabled={currentPage == 1}
            >
                {"<"}
            </button>
            {pageButtonsGenerator(7)}
            <button className="item"
                onClick={handlePageChange}
                value={+currentPage + 1}
                disabled={currentPage == totalPages}
            >
                {">"}
            </button>
            <button className="item"
                onClick={handlePageChange}
                value={+totalPages}
                disabled={currentPage == totalPages}
            >
                {">>"}
            </button>
        </div>
    );
}
export default Pagination;
