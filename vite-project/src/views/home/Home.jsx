import React from "react";
import "./Home.css";
import { connect } from "react-redux";
import Cards from "../../components/cards/Cards";
import Pagination from "../../components/pagination/Pagination";
const dogsData = {
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
};
function Home() {
    return (
        <div className="Home">
            <Cards dogsData={dogsData} />
            <Pagination />
        </div>
    );
}

export default Home;