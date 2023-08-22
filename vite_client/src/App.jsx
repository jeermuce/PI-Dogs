import { useEffect, useState, createContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import axios, { all } from "axios";

import "./App.css";

import Landing from "./views/Landing";
import Home from "./views/Home";
import About from "./views/About";
import Details from "./views/Details";
import Navbar from "./components/Navbar";
import Create from "./views/Create";

const AppContext = createContext();

function App() {
    const baseURL = "http://localhost:3001/";
    const location = useLocation();
    const [allDogs, setAllDogs] = useState([]);
    const [units, setUnits] = useState("metric");

    /*         useEffect(() => {
            axios.get(`${baseURL}dogs`).then(({ data }) => {
                setAllDogs(data);
            });
        }, []);
 */
    return (
        <AppContext.Provider
            value={{ allDogs, setAllDogs, units, setUnits, baseURL, location }}
        >
            <section className="App">
                {location.pathname !== "/" && <Navbar />}
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/details/:id" element={<Details />} />
                    <Route path="/create" element={<Create />} />
                </Routes>
            </section>
        </AppContext.Provider>
    );
}
export { AppContext };
export default App;
