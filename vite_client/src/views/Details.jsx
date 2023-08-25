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
    let dog = allDogs.find((dog) => dog.id == id);

    if (dog) {
        dog = dog;
    } else
        dog = {
            name: "Loading...",
            image: "https://i.pinimg.com/originals/0f/6e/1e/0f6e1e1b6b0b0b0b0b0b0b0b0b0b0b0b.gif",
            temperaments: ["Loading..."],
            weight: "Loading...",
            weight_imperial: "Loading...",
            height: "Loading...",
            height_imperial: "Loading...",
            life_span: "Loading...",
        };
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
        <section className="details-page">
            <h1 className="details-title-h1">Details:</h1>

            {/* parent */}
            <div className="details-container">
                {/* firstChild */}
                <div className="details-data-container">
                    <p className="details-id-p">ID: {id}</p>
                    <h1 className="details-name-h1">{name}</h1>
                    <p
                        className="
                        details-weight-p
                    "
                    >
                        <label htmlFor="detailsWeight">Weight: </label>
                        {units === "imperial"
                            ? `${weight_imperial} lbs`
                            : `${weight} kg`}
                    </p>
                    <p className="details-height-p">
                        <label htmlFor="detailsHeight"> Height: </label>
                        {units === "imperial"
                            ? `${height_imperial} in`
                            : `${height} cm`}
                    </p>

                    <p className="details-id-temperaments">
                        <label htmlFor="detailsTemperaments">
                            Temperaments:{" "}
                        </label>
                        {temperaments
                            .map((t) => {
                                return t + ", ";
                            })
                            .join("")
                            .slice(0, -2)}
                    </p>
                    <p className="details-lifespan-p">
                        <label htmlFor="detailsLifeSpan">Life Span: </label>
                        {life_span}
                    </p>
                </div>
                {/* last child */}
                <div className="details-dog-image-container">
                    <img
                        src={image}
                        alt={name + " image"}
                        className="details-dog-image"
                    />
                </div>
            </div>
        </section>
    );
}

export default Details;
