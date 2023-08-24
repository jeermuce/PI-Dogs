import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios";
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
        location,
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
    const [inputTemperaments, setInputTemperaments] = React.useState([]);
    const [textTemperaments, setTextTemperaments] = React.useState([]);
    const [checkboxTemperaments, setCheckboxTemperaments] = React.useState([]);
    const [errors, setErrors] = React.useState({
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
    const [form, setForm] = React.useState({
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
        console.log("form", form);
        console.log("errors", errors);
    }, [form, errors]);

    /*     function handleChange(event) {
        let { name, value, type, checked } = event.target;
        switch (name) {
            case "temperaments":
                type === "checkbox" && checked
                    ? setForm((prevState) => {
                          let updatedState = { ...prevState };
                          updatedState.temperaments.push(value);
                          updatedState.temperaments = [
                              ...new Set(updatedState.temperaments),
                          ];
                          return updatedState;
                      })
                    : setForm((prevState) => {
                          let updatedState = { ...prevState };
                          updatedState.temperaments =
                              updatedState.temperaments.filter(
                                  (t) => t !== value
                              );
                          updatedState.temperaments = [
                              ...new Set(updatedState.temperaments),
                          ];

                          return updatedState;
                      });
                type === "text" && //temperaments text is a comma separated string, convert to array
                    setForm((prevState) => {
                        let checkboxes = document.querySelectorAll(
                            "input[type=checkbox]"
                        );
                        checkboxes.forEach((checkbox) => {
                            checkbox.checked = false;
                        });
                        let updatedState = { ...prevState };
                        updatedState.temperaments = value
                            .split(",")
                            .map((t) => t.trim().capitalize());
                        //remove "" from array
                        updatedState.temperaments =
                            updatedState.temperaments.filter((t) => t !== "");

                        updatedState.temperaments = [
                            ...new Set(updatedState.temperaments),
                        ];
                        setCheckboxTemperaments(updatedState.temperaments);
                        return updatedState;
                    });
                break;
            default:
                setForm((prevState) => {
                    let updatedState = { ...prevState };
                    updatedState[name] = value.capitalize();

                    return updatedState;
                });
                break;
        }
        validate(value, name, errors, setErrors);
    } */

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
                    onSubmit={(event) =>
                        submitDog(
                            event,
                            form,
                            setForm,
                            setErrors,
                            setCreatedDog,
                            units,
                            baseURL
                        )
                    }
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
                    className="main-with-sidebar"
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
                {temperaments.map((temperament) => (
                    <div
                        className="checkbox"
                        key={temperament}
                        style={{
                            backgroundColor: form.temperaments.includes(
                                temperament
                            )
                                ? "var(--primary)"
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
                            /* if the thing is checked, make the background --primary */

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
