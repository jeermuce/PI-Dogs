import React, { useEffect } from "react";
import "./details.css";
import Navbar from "../../components/navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getDogDetail } from "../../redux/actions";
import { useParams } from "react-router-dom";

function Details() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogDetail(id));
    }, []);
    const dog = useSelector((state) => state.reducer.dogDetail);
    const units = useSelector((state) => state.reducer.units);
    const {
        height,
        height_imperial,
        image,
        life_span,
        name,
        source,
        weight,
        weight_imperial,
        temperaments,
    } = dog;
    return (
        <div className="details-page">
            <Navbar />
            {dog.name ? (
                <div className="details-container">
                    <div className="details-data-container">
                        <h6
                            style={{
                                opacity: 0.5,
                            }}
                        >
                            id:{id}
                        </h6>
                        <h1>Breed: {name}</h1>

                        <p>Life expectancy: {life_span}</p>
                        {units ? (
                            <p>Height: {height} centimeters</p>
                        ) : (
                            <p>Height: {height_imperial} inches</p>
                        )}
                        {units ? (
                            <p>Weight: {weight} kilograms</p>
                        ) : (
                            <p>Weight: {weight_imperial} pounds</p>
                        )}

                        <p>Temperaments: {temperaments.join(", ")}</p>
                    </div>
                    <div className="details-dog-image-container">
                        <img
                            src={image}
                            alt={name}
                            className="details-dog-image"
                        />
                    </div>
                </div>
            ) : (
                <div className="details-container">
                    <h1>Loading......</h1>
                </div>
            )}
        </div>
    );
}

export default Details;
/* 
height: "23 - 29"
​
height_imperial: "9 - 11.5"
​
id: 1
​
image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
​
life_span: "10 - 12 years"
​
name: "Affenpinscher"
​
source: "api"
​

*/
