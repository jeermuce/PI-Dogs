import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
    return (
        <div className="Landing">
            <Link to="/home">
                <button>POUNCE</button>
            </Link>
        </div>
    );
}

export default Landing;
