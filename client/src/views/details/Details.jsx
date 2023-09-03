import React, { useEffect } from "react";
import "./details.css";
import Navbar from "../../components/navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getDogDetail } from "../../redux/actions";
import { useParams } from "react-router-dom";
import loading from "../../assets/loading.png";

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
    if (dog.temperaments) {
    }
    return (
        <div className="details-page">
            <Navbar />
            {dog.name ? (
                <div
                    className="details-container"
                    style={
                        source === "api"
                            ? { border: "ridge 0.2rem var(--accent)" }
                            : source === "database"
                            ? { border: "groove 0.2rem var(--primary)" }
                            : {
                                  border: "solid 0.2rem rgba(var(--background-decimal-rgb), 0.8)",
                              }
                    }
                >
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
                <div
                    className="details-container"
                    style={{
                        height: "fit-content",
                        backgroundImage: "none",
                        borderRadius: "50rem",
                        aspectRatio: "1/1",
                    }}
                >
                    <img
                        src={loading}
                        alt="loading"
                        style={{
                            height: "10rem",
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default Details;
