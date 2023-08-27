// import React, { useEffect, useContext } from "react";
// import Cards from "../components/Cards";
// import Pagination from "../components/Pagination";
// import axios from "axios";
// import "./css/home.css";
// import { AppContext } from "../App";

// function Home() {
//     const { allDogs, units } = useContext(AppContext);
//     /*     useEffect(() => {
//         axios.get(`${baseURL}dogs?page=${page}`).then(({ data }) => {
//             setAllDogs(data.dogs);
//         });
//         setClear(false);
//     }, [page, createdDog, clear]);
//  */
//     return (
//         <div className="homePage">
//             <div className="empty-div-nav-spacer"></div>
//             {allDogs[1] ? (
//                 <>
//                     <Cards allDogs={allDogs} units={units} />
//                     <Pagination />
//                 </>
//             ) : (
//                 <div className="loading">Loading...</div>
//             )}
//         </div>
//     );
// }

// export default Home;
import React, { Component } from "react";
class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="homePage">
                <div className="empty-div-nav-spacer"></div>
                {this.props.allDogs[1] ? (
                    <>
                        <Cards
                            allDogs={this.props.allDogs.dogs}
                            units={this.props.units}
                        />
                        <Pagination />
                    </>
                ) : (
                    <div className="loading">Loading...</div>
                )}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        allDogs: state.allDogs,
        units: state.units,
    };
};
