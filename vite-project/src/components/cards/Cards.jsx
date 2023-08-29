import React from "react";
import "./Cards.css";
import Card from "../card/Card";

function Cards({ dogsData }) {
    return (
        <div className="Cards">
            {dogsData.dogs.map((dog) => (
                <Card dog={dog} key={dog.id} />
            ))}
        </div>
    );
}

export default Cards;
