import React from "react";
import { Link } from "react-router-dom";
import "./css/card.css";

function Card({ dog, units }) {
    if (typeof dog === "string") {
        return <section className="card-dog-not-found">{dog}</section>;
    }

    const { id, name, temperaments, image, weight, weight_imperial } = dog;
    const temperaments2 = temperaments.slice(0, 2);
    return (
        <Link
            to={`/details/${id}`}
            className="link"
            style={{
                width: "100%",
            }}
        >
            <section
                className="card"
                style={{
                    border: isNaN(id) ? "groove 0.2rem blue" : "",
                }}
            >
                <img src={image} alt={name} className="card-image" />
                <div className="card-data">
                    <p className="card-name">{name}</p>
                    <p className="card-temperaments">
                        {temperaments2
                            .map((t) => t + ", ")
                            .join("")
                            .slice(0, -1)
                            .concat("...")}
                    </p>
                    {units === "metric" ? (
                        <p className="card-weight">{weight} kg</p>
                    ) : (
                        <p className="card-weight">{weight_imperial} lbs</p>
                    )}
                </div>
            </section>
        </Link>
    );
}

export default Card;
