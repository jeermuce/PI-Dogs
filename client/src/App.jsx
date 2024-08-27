import { Route, Routes } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

import "./App.css";

import Home from "./views/home/Home";
import Create from "./views/create/Create";
import Landing from "./views/landing/Landing";
import Details from "./views/details/Details";
function App() {
	console.log(import.meta.env.VITE_SERVER_URL);

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
