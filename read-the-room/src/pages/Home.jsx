import React from 'react';
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <>
            <h1>Testing</h1>

            <Link to="/teacher">Teacher</Link>
            <Link to="/student">Student</Link>
        </>
    )
}

export default Home;
