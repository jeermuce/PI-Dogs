import validate from "./validate";

function createDogHandleChange(
    event,
    form,
    setForm,
    setErrors,
    setCheckboxTemperaments,
    errors
) {
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
                          updatedState.temperaments.filter((t) => t !== value);
                      updatedState.temperaments = [
                          ...new Set(updatedState.temperaments),
                      ];

                      return updatedState;
                  });
            type === "text" &&
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
}

export default createDogHandleChange;
