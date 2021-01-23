import React from 'react';
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <>
            <h1 className="sr-only">Welcome to Read the Room!</h1>
            <div>Pick one of these to get started:</div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="large-button">
                        <Link to="/teacher">
                            <div>
                                👩‍🏫
                            </div>
                            <div>
                                Teacher
                            </div>
                            <div>
                                Host a session
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="large-button">
                        <Link to="/student">
                            <div>
                                👨‍🎓
                            </div>
                            <div>
                                Student
                            </div>
                            <div>
                                Join a session
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
