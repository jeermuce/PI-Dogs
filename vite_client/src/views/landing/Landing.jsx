import { Link } from "react-router-dom";
import "./landing.css";

function Landing() {

    return (
        <div className="landing">
            <Link to="/home">
                <button className="homeButton">Pounce</button>
            </Link>
        </div>
    );
}

export default Landing;
