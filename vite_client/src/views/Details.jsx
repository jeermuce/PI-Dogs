import React from "react";
import "./css/details.css";
import { AppContext } from "../App";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Details() {
    const { allDogs, setAllDogs, units, setUnits, baseURL, location } =
        useContext(AppContext);
    const { id } = useParams();
    const dog = allDogs.find((dog) => dog.id == id);
    const {
        name,
        image,
        temperaments,
        weight,
        weight_imperial,
        height,
        height_imperial,
        life_span,
    } = dog;
    console.log(units);
    return (
        <section className="detailsPage">
            <div className="emptyDivNav"></div>
            <div className="detailsBox">
                <div className="detailsBox">
                    <img
                        src={image}
                        alt={name + " image"}
                        className="dogImage"
                    />
                    <h1 className="name">{name}</h1>
                    <h2 className="temperaments">
                        {temperaments.map((t) => t + ", ")}
                    </h2>
                    {units === "metric" ? (
                        <h3 className="weight">{weight} kg</h3>
                    ) : (
                        <h3 className="weight">{weight_imperial} lbs</h3>
                    )}
                    {units === "metric" ? (
                        <h3 className="height">{height} cm</h3>
                    ) : (
                        <h3 className="height">{height_imperial} in</h3>
                    )}
                    <h3 className="life_span">{life_span}</h3>
                </div>
            </div>
        </section>
    );
}

export default Details;
