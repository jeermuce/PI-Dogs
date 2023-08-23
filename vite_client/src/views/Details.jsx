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

    return (
        <section className="detailsPage">
            <div className="emptyDivNav"></div>
            <div className="main-with-sidebar">
                <div className="detailsData">
                    <h1 className="detailsTitle">Details:</h1>
                    <p className="detailsId">ID: {id}</p>
                    <h1 className="detailsName">{name}</h1>
                    <p className="detailsWeight">
                        <label htmlFor="detailsWeight">Weight: </label>
                        {units === "imperial"
                            ? `${weight_imperial} lbs`
                            : `${weight} kg`}
                    </p>
                    <p className="detailsHeight">
                        <label htmlFor="detailsHeight"> Height: </label>
                        {units === "imperial"
                            ? `${height_imperial} in`
                            : `${height} cm`}
                    </p>

                    <p className="detailsTemperaments">
                        <label htmlFor="detailsTemperaments">
                            Temperaments:
                        </label>
                        {temperaments.map((t) => {
                            return t + ", ";
                        })}
                    </p>
                    <p className="detailsLifeSpan">
                        <label htmlFor="detailsLifeSpan">Life Span: </label>
                        {life_span}
                    </p>
                </div>
                <div className="imageContainer">
                    <img
                        src={image}
                        alt={name + " image"}
                        className="dogImage"
                    />
                </div>
            </div>
        </section>
    );
}

export default Details;
