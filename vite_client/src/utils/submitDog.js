import axios from "axios";
import { useNavigate } from "react-router-dom";
function submitDog(
    event,
    form,
    setForm,
    setErrors,
    setCreatedDog,
    units,
    baseURL
) {
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
    console.log(newDog);
    const dog = axios.post(`${baseURL}dogs`, newDog).then(({ data }) => {
        setCreatedDog(data);
    });

    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    document.querySelector("form").reset();
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    return dog;
}

export default submitDog;
