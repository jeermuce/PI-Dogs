import React from "react";
import { Link } from "react-router-dom";
import "./css/card.css";

function Card({ dog, units }) {
    const { id, name, temperaments, image, weight, weight_imperial } = dog;
    return (
        <div className="card">
            <img src={image} alt={name} className="image" />
            <Link to={`/details/${id}`} className="link">
                <h1 className="name">{name}</h1>
            </Link>
            <h2 className="temperaments">
                {temperaments.map((t) => t + ", ")}
            </h2>
            {units === "metric" ? (
                <h3 className="weight">{weight} kg</h3>
            ) : (
                <h3 className="weight">{weight_imperial} lbs</h3>
            )}
        </div>
    );
}

export default Card;
/*Imagen.
Nombre.
Temperamentos.
Peso. {
    "id": 1,
    "name": "Affenpinscher",
    "weight": "3 - 6",
    "weight_imperial": "6 - 13",
    "height": "23 - 29",
    "height_imperial": "9 - 11.5",
    "life_span": "10 - 12 years",
    "image": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
    "temperaments": [
      "Stubborn",
      "Curious",
      "Playful",
      "Adventurous",
      "Active",
      "Fun-loving"
    ]
  } */
