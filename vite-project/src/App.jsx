import "./App.css";
import Home from "./views/home/Home";
import Landing from "./views/landing/Landing";
import Search from "./views/search/Search";
import Create from "./views/create/Create";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
    const location = useLocation();
    return (
        <div className="App">
            {location.pathname !== "/" ? <Navbar /> : null}

            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </div>
    );
}

export default App;
