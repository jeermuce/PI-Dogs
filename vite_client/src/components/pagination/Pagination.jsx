import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./pagination.css";
import { setPage } from "../../redux/actions";
function Pagination() {
    const dispatch = useDispatch();
    const pageState = useSelector((state) => state.reducer.currentPage);
    const totalCount = useSelector((state) => state.reducer.dogs.totalCount);
    const totalPages = Math.ceil(totalCount / 8);
    const pages = [];
    const [currentPage, setCurrentPage] = useState(pageState);

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    useEffect(() => {
        if (currentPage != pageState) {
            dispatch(setPage(currentPage));
        }
        if (currentPage > totalPages || currentPage < 1) {
            setCurrentPage(1);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, pageState, totalPages]);

    function handlePageChange(e) {
        setCurrentPage(e.target.value);
    }
    function pageButtonsGenerator() {
        function renderPageButton(page, currentPage, totalPages) {
            if (currentPage > totalPages - 2 && page >= totalPages - 4) {
                return true;
            }
            if (currentPage < 3 && page <= 5) {
                return true;
            }
            if (currentPage - page > 2 || page - currentPage > 2) {
                return false;
            }
            return true;
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
                    className={
                        page == currentPage ? "active-page" : "inactive-page"
                    }
                >
                    {page}
                </button>
            );
        });
    }
    return (
        <div className="pagination">
            <button
                onClick={handlePageChange}
                value={1}
                disabled={currentPage == 1}
            >
                {"<<"}
            </button>
            <button
                onClick={handlePageChange}
                value={currentPage - 1}
                disabled={currentPage == 1}
            >
                {"<"}
            </button>
            <div className="numbered-pages">{pageButtonsGenerator()}</div>
            <button
                onClick={handlePageChange}
                value={+currentPage + 1}
                disabled={currentPage == totalPages}
            >
                {">"}
            </button>
            <button
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
