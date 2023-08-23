import { useEffect, useState, createContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import axios, { all } from "axios";

import "./App.css";

import Landing from "./views/Landing";
import Home from "./views/Home";
import Details from "./views/Details";
import Navbar from "./components/Navbar";
import Create from "./views/Create";
import Filters from "./components/Filters";

const AppContext = createContext();

function App() {
    const baseURL = "http://localhost:3001/";
    const location = useLocation();
    const [allDogs, setAllDogs] = useState([]);
    const [units, setUnits] = useState("metric");
    const [showFilters, setShowFilters] = useState(false);
    const [details, setDetails] = useState({});

    const [temperaments, setTemperaments] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(`${baseURL}dogs?page=${page}`).then(({ data }) => {
            setAllDogs(data.dogs);
        });
    }, [page]);

    useEffect(() => {
        getTemperaments();
        async function getTemperaments() {
            await axios.get(`${baseURL}temperaments`).then(({ data }) => {
                setTemperaments(data.map((t) => t.name));
            });
        }
    }, []);
    return (
        <AppContext.Provider
            value={{
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
            }}
        >
            <section className="App">
                {location.pathname !== "/" && <Navbar />}
                {location.pathname !== "/" && showFilters && <Filters />}
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/details/:id" element={<Details />} />
                    <Route path="/create" element={<Create />} />
                </Routes>
            </section>
        </AppContext.Provider>
    );
}
export { AppContext };
export default App;
