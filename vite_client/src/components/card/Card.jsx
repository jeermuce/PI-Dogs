import React from "react";
import "./card.css";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Card({ dog }) {
    const units = useSelector((state) => state.reducer.units);
    return (
        <>{typeof dog === "string" ? noMatches(dog) : dogFound(dog, units)}</>
    );
}

export default Card;
function noMatches(dog) {
    return (
        <div
            className="card"
            style={{
                border: "solid 0.2rem red",
            }}
        >
            <h1>{dog}</h1>
        </div>
    );
}

function dogFound(dog, units) {
    return (
        <NavLink to={`/home/${dog.id}`}>
            <div
                className="card"
                style={{
                    border:
                        dog.source === "api"
                            ? "ridge 0.2rem var(--accent)"
                            : dog.source === "database"
                            ? "groove 0.2rem var(--primary)"
                            : "solid 0.2rem rgba(var(--background-decimal-rgb), 0.8)",
                }}
            >
                <img
                    src={dog.image || dog.error}
                    alt="image"
                    className="card-image"
                />
                <div
                    className="card-data"
                    style={{
                        backgroundColor:
                            dog.source === "api"
                                ? "rgba(var(--accent-decimal-rgb), 0.8)"
                                : dog.source === "database"
                                ? "rgba(var(--primary-decimal-rgb), 0.8)"
                                : "rgba(var(--background-decimal-rgb), 0.8)",
                    }}
                >
                    <h1>{dog.name}</h1>
                    <h3>
                        {units
                            ? dog.weight && dog.weight + " kg"
                            : dog.weight_imperial &&
                              dog.weight_imperial + " lb"}
                    </h3>

                    <h3>{dog.temperaments && dog.temperaments.join(", ")}</h3>
                </div>
            </div>
        </NavLink>
    );
}
/* background-color: rgba(var(--accent-decimal-rgb), 0.8); */
