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

    /*      
ID.
Imagen.
Nombre.
Altura.
Peso.
Temperamentos.
Años de vida.  */
    return (
        <section className="detailsPage">
            <div className="emptyDivNav"></div>
            <div className="detailsBox">
                <div className="detailsData">
                    <p className="detailsId">
                        ID: <>{id}</>
                    </p>
                    <h1 className="detailsName">Name: {name}</h1>
                    <p className="detailsWeight">
                        Weight:{" "}
                        {units === "imperial"
                            ? `${weight_imperial} lbs`
                            : `${weight} kg`}
                    </p>
                    <p className="detailsHeight">
                        Height:{" "}
                        {units === "imperial"
                            ? `${height_imperial} in`
                            : `${height} cm`}
                    </p>

                    <p className="detailsTemperaments">
                        Temperaments:{" "}
                        {temperaments.map((t) => {
                            return t + ", ";
                        })}
                    </p>
                    <p className="detailsLifeSpan">Life Span: {life_span}</p>
                </div>

                <div className="detailsImageBox">
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
