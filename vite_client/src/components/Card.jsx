import React from "react";
import { Link } from "react-router-dom";
import "./css/card.css";

function Card({ dog, units }) {
    const { id, name, temperaments, image, weight, weight_imperial } = dog;
    const temperaments2 = temperaments.slice(0, 2);
    return (
        <section className="card">
            <img src={image} alt={name} className="cardImage" />
            <div className="cardData">
                <Link to={`/details/${id}`} className="link">
                    <p className="cardName">{name}</p>
                </Link>
                <p className="cardTemperaments">
                    {temperaments2.map((t) => t + ", ")}
                </p>
                {units === "metric" ? (
                    <p className="cardWeight">{weight} kg</p>
                ) : (
                    <p className="cardWeight">{weight_imperial} lbs</p>
                )}
            </div>
        </section>
    );
}

export default Card;
