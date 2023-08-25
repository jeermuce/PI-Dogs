import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import "./css/create.css";
import submitDog from "../utils/submitDog";
import createDogHandleChange from "../utils/createDogHandleChange";
const doubleInput = ["Height", "Weight", "Life_span"];
const singleInput = ["Name", "Image"];

function Create() {
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
        let trimmedStr = this.trim();
        return trimmedStr.charAt(0).toUpperCase() + trimmedStr.slice(1);
    };
    const {
        allDogs,
        setAllDogs,
        units,
        setUnits,
        baseURL,
        showFilters,
        setShowFilters,
        details,
        setDetails,
        temperaments,
        setTemperaments,
        page,
        setPage,
        createdDog,
        setCreatedDog,
    } = useContext(AppContext);
    //deal with dogExists
    const [checkboxTemperaments, setCheckboxTemperaments] = React.useState([]);

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

    return (
        <>
            <div className="container">
                <h1 className="create-title">Create a dog</h1>
                <form
                    onSubmit={(event) => {
                        return submitDog(
                            event,
                            form,
                            setForm,
                            setErrors,
                            setCreatedDog,
                            units,
                            baseURL
                        );
                    }}
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
                    {doubleInput.map((input) => (
                        <div>
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
