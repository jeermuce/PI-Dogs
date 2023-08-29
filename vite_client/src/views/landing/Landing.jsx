import { Link } from "react-router-dom";
import "./landing.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTemperaments } from "../../redux/actions";

function Landing() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTemperaments());
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
