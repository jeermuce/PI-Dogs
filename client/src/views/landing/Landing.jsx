import { Link } from "react-router-dom";
import "./landing.css";
import { useEffect } from "react";
import { getDogs, getTemperaments } from "../../redux/actions";
import { useDispatch } from "react-redux";

function Landing() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTemperaments());
        dispatch(getDogs());
    }, []);
    return (
        <div className="landing">
            <Link to="/home">
                <button className="homeButton">Pounce</button>
            </Link>
        </div>
    );
}

export default Landing;
