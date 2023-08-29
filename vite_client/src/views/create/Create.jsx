import React, { useEffect, useState } from "react";
import "./create.css";
import createDogHandleChange from "../../utils/createDogHandleChange";
const doubleInput = ["Height", "Weight", "Life_span"];
const singleInput = ["Name", "Image"];
import { useDispatch, useSelector } from "react-redux";
import { createDog, getDogs } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
function Create() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogs({ creation: true }));
    }, []);
    const allDogs = useSelector((state) => state.reducer.dogs.dogs);

    String.prototype.capitalize = function () {
        if (
            this === "" ||
            this === " " ||
            this === null ||
            this === undefined ||
            !isNaN(this)
        ) {
            return this;
        }
        //split string into an array of words based on spaces
        let strArr = this.split(" ");
        //trim each word
        strArr = strArr.map((word) => word.trim());
        //capitalize each word
        strArr = strArr.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        //join the array back into a string
        let capitalizedStr = strArr.join(" ");
        //trim the string
        capitalizedStr = capitalizedStr.trim();
        return capitalizedStr;
    };
    const unitBool = useSelector((state) => state.reducer.units);
    const createdDog = useSelector((state) => state.reducer.createdDog);
    let temperaments = useSelector(
        (state) => state.reducer.temperaments.temperaments
    );
    temperaments = temperaments.map((temperament) =>
        temperament.name.capitalize()
    );

    useEffect(() => {
        if (createdDog && createdDog.id) {
            navigate(`/home/${createdDog.id}`);
        }
    }, [createdDog]);

    //deal with dogExists
    const [checkboxTemperaments, setCheckboxTemperaments] = React.useState([]);
    var units = "";
    if (unitBool) {
        units = "metric";
    } else {
        units = "imperial";
    }
    const [errors, setErrors] = useState({
        name: null,
        image: null,
        height_low: null,
        height_high: null,
        weight_low: null,
        weight_high: null,
        life_span_low: null,
        life_span_high: null,
        temperaments: null,
    });
    const [form, setForm] = useState({
        name: "",
        image: "",
        height_low: "",
        height_high: "",
        height_unit: `${units}`,
        weight_low: "",
        weight_high: "",
        weight_unit: `${units}`,
        life_span_low: "",
        life_span_high: "",
        temperaments: [],
    });

    useEffect(() => {
        setForm((prevState) => {
            let updatedState = { ...prevState };
            updatedState.height_unit = units;
            updatedState.weight_unit = units;
            return updatedState;
        });
    }, [units]);

    useEffect(() => {
        let dogExists = false;
        if (
            form.name === "" ||
            form.name === " " ||
            form.name === null ||
            form.name === undefined
        ) {
            return;
        }
        allDogs.forEach((dog) => {
            if (dog.name.toLowerCase() === form.name.toLowerCase()) {
                dogExists = true;
            }
        });
        setErrors((prevState) => {
            let updatedState = { ...prevState };
            updatedState.name = dogExists ? "Dog already exists" : "";
            return updatedState;
        });
    }, [form]);
    useEffect(() => {
        setForm({
            name: "",
            image: "",
            height_low: "",
            height_high: "",
            height_unit: `${units}`,
            weight_low: "",
            weight_high: "",
            weight_unit: `${units}`,
            life_span_low: "",
            life_span_high: "",
            temperaments: [],
        });
        setErrors({
            name: null,
            image: null,
            height_low: null,
            height_high: null,
            weight_low: null,
            weight_high: null,
            life_span_low: null,
            life_span_high: null,
            temperaments: null,
        });
    }, [createdDog]);
    /*  */

    function disableSubmit() {
        for (let error in errors) {
            if (errors[error] !== "") {
                return true;
            }
        }
        return false;
    }
    function handleSubmit(event) {
        event.preventDefault();

        let newDog = {
            name: form.name,
            image: form.image,
            height_low: form.height_low,
            height_high: form.height_high,
            height_unit: form.height_unit,
            weight_low: form.weight_low,
            weight_high: form.weight_high,
            weight_unit: form.weight_unit,
            life_span_low: form.life_span_low,
            life_span_high: form.life_span_high,
            temperaments: form.temperaments,
        };
        let checkboxes = document.querySelectorAll("input[type=checkbox]");
        document.querySelector("form").reset();
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });

        dispatch(createDog(newDog));
    }
    return (
        <>
            <Navbar />
            <div className="container">
                <h1 className="create-title">Create a dog</h1>
                <form
                    onSubmit={handleSubmit}
                    onChange={(event) =>
                        createDogHandleChange(
                            event,
                            form,
                            setForm,
                            setErrors,
                            setCheckboxTemperaments,
                            errors
                        )
                    }
                    className="form-contents"
                >
                    {firstChild()}

                    {lastChild()}
                </form>
            </div>
        </>
    );

    function lastChild() {
        return (
            <div className="temperaments-menu">
                {temperaments.map((temperament, index) => (
                    <div
                        className="checkbox"
                        key={index}
                        style={{
                            backgroundColor: form.temperaments.includes(
                                temperament
                            )
                                ? "var(--accent)"
                                : "var(--background)",
                        }}
                    >
                        <input
                            style={{ display: "none" }}
                            key={temperament}
                            type="checkbox"
                            name="temperaments"
                            id={temperament}
                            value={temperament}
                        />
                        <label
                            key={index}
                            className="label-attribute-temperament"
                            htmlFor={temperament}
                        >
                            {temperament}
                        </label>
                    </div>
                ))}
            </div>
        );
    }
    function firstChild() {
        return (
            <div className="firstChild">
                <div className="text-input-container">
                    {singleInput.map((input) => (
                        <div className="single-input" key={input}>
                            <label className="label-attribute" htmlFor={input}>
                                {input}:
                            </label>
                            <input
                                className="single-input-input"
                                type="text"
                                /* if input is Image, placeholder is url, otherwise it is input */
                                placeholder={input === "Image" ? "URL" : input}
                                name={input.toLowerCase()}
                                id={input.toLowerCase()}
                            />
                            {errors[input.toLowerCase()] && (
                                <span className="error">
                                    {errors[input.toLowerCase()]}
                                </span>
                            )}
                        </div>
                    ))}
                    {doubleInput.map((input, index) => (
                        <div key={index} className="double-input-container">
                            <div className="double-input" key={input}>
                                <label
                                    className="label-attribute"
                                    htmlFor={input}
                                >
                                    {input.replace(/_/g, " ")}:
                                </label>
                                <input
                                    className="double-input-input"
                                    type=""
                                    placeholder="Low"
                                    name={`${input.toLowerCase()}_low`}
                                    id={`${input.toLowerCase()}_low`}
                                />
                                <input
                                    className="double-input-input"
                                    type=""
                                    placeholder="High"
                                    name={`${input.toLowerCase()}_high`}
                                    id={`${input.toLowerCase()}_high`}
                                />
                                {(errors[`${input.toLowerCase()}_low`] && (
                                    <span className="error">
                                        {errors[`${input.toLowerCase()}_low`]}
                                    </span>
                                )) ||
                                    (errors[`${input.toLowerCase()}_high`] && (
                                        <span className="error">
                                            {
                                                errors[
                                                    `${input.toLowerCase()}_high`
                                                ]
                                            }
                                        </span>
                                    ))}
                            </div>
                        </div>
                    ))}
                    <div className="single-input">
                        <label
                            className="label-attribute"
                            htmlFor="temperaments"
                        >
                            Temperaments:
                        </label>
                        <input
                            className="single-input-input"
                            type="text"
                            placeholder="Temperaments"
                            name="temperaments"
                            id="textTemper"
                        />

                        {errors.temperaments && (
                            <p className="error">{errors.temperaments}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="submit"
                        disabled={disableSubmit()}
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

export default Create;
