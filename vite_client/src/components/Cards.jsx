// import React, { useContext } from "react";
// import Card from "./Card";
// import "./css/cards.css";
// import { AppContext } from "../App";
// import wood from "../assets/wood.png";
// function Cards() {
//     const { allDogs, units, showFilters } = useContext(AppContext);

//     return (
//         <div
//             className="box"
//             style={{
//                 marginTop: showFilters ? "2rem" : "0",
//                 height: showFilters ? "calc(100% - 2rem)" : "100%",
//             }}
//         >
//             {allDogs.map((dog, i) => (
//                 <Card key={i} dog={dog} units={units} />
//             ))}
//         </div>
//     );
// }
// export default Cards;

import React from "react";
import Card from "./Card";

function Cards(props) {
    return (
        <div
            className="box"
            // style={{
            //     marginTop: showFilters ? "2rem" : "0",
            //     height: showFilters ? "calc(100% - 2rem)" : "100%",
            // }}
        >
            {props.allDogs.dogs.map((dog, i) => (
                <Card key={i} dog={dog} units={props.units} />
            ))}
        </div>
    );
}

export default Cards;
/*     allDogs: {
        totalCount: 174,
        dogs: [
            {
                id: "bba51e40-f3b2-4baa-8da1-a4c22a37ad48",
                name: "English muffin",
                weight: "3 - 4",
                weight_imperial: "6.61 - 8.82",
                height: "1 - 2",
                height: "0.39 - 0.79",
                life_span: "5 - 6 years",
                image: "https://outwardhound.com/furtropolis/wp-content/uploads/2020/03/Doggo-Lingo-Post.jpg",
                temperaments: [
                    "Hello",
                    "I'm new",
                    "001",
                    "Adaptable",
                    "Adventurous",
                    "Aggressive",
                    "Agile",
                ],
                source: "database",
            },
        ],
    }, */
