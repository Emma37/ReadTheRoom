import React from 'react';
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <>
            <h1>Please select</h1>
            <div className="row">
                <div className="col-lg-6">
                    <Link to="/teacher">
                            Teacher
                    </Link>
                </div>
                <div className="col-lg-6">
                    <Link to="/student">
                            Student
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Home;
