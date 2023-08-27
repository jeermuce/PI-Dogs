import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <Router>
            <StrictMode>
                <App />
            </StrictMode>
        </Router>
    </Provider>
);
