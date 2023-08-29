import React from "react";
import "./Card.css";

function Card({ dog }) {
    if (typeof dog === "string") {
        return <section className="card-dog-not-found">{dog}</section>;
    }
    return (
        <div className="Card" key={dog.id}>
            <div className="card-inner">
                <div className="card-visible">
                    <img
                        src={dog.image}
                        alt={dog.name}
                        className="card-image"
                    />
                </div>
                <div className="card-hidden">
                    <div className="card-data">
                        <h2 className="card-title">{dog.name}</h2>
                        <p className="card-weight">{dog.weight}</p>
                        <p className="card-temperaments">
                            {dog.temperaments.map((temperament) => temperament)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
