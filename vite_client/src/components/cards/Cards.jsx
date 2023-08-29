import React, { useState } from "react";
import "./cards.css";
import Card from "../card/Card";

function Cards(props) {
    return (
        <div className="box">
            {props.dogs?.map((dog, index) => {
                return <Card dog={dog} key={index} />;
            })}
        </div>
    );
}

export default Cards;
