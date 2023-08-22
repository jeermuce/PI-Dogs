import React, { useContext } from "react";
import Card from "./Card";
import "./css/cards.css";
import { AppContext } from "../App";
function Cards() {
    const { allDogs, units } = useContext(AppContext);
    return (
        <div className="box">
            {allDogs.map((dog, i) => (
                <Card key={i} dog={dog} units={units} />
            ))}
        </div>
    );
}

export default Cards;
