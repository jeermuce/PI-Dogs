import { Route, Routes } from "react-router-dom";

import "./App.css";

import Home from "./views/home/Home";
import Create from "./views/create/Create";
import Landing from "./views/landing/Landing";
import Details from "./views/details/Details";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTemperaments } from "./redux/actions";
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTemperaments());
    }, []);

    return (
        <section className="App">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/home/:id" element={<Details />} />
            </Routes>
        </section>
    );
}
export default App;
