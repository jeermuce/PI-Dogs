import React, { useContext } from "react";
import Card from "./Card";
import "./css/cards.css";
import { AppContext } from "../App";
import wood from "../assets/wood.png";
function Cards() {
    const { allDogs, units, showFilters } = useContext(AppContext);

    return (
        <div
            className="box"
            style={{
                marginTop: showFilters ? "2rem" : "0",
                height: showFilters ? "calc(100% - 2rem)" : "100%",
            }}
        >
            {allDogs.map((dog, i) => (
                <Card key={i} dog={dog} units={units} />
            ))}
        </div>
    );
}
export default Cards;
