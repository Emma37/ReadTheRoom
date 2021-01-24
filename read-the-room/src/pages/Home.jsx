import React from 'react';
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <>
            <h1>Welcome to Read the Room!</h1>
            <div>Read the Room lets students anonymously share their emotional responses with their teacher, to help improve remote learning for everyone</div>
            <div className="mt-4">Pick one of these to get started:</div>
            <div className="row mt-3">
                <div className="col-lg-6">
                    <Link to="/teacher" title="Host a session" className="btn btn-primary large-button">
                            <div className="large-button__icon">
                                🍎
                            </div>
                            <div className="large-button__title">
                                Teacher
                            </div>
                            <div>
                                Host a session
                            </div>
                    </Link>
                </div>
                <div className="col-lg-6 mt-4 mt-lg-0">
                    <Link to="/student" title="Join a session" className="btn btn-primary large-button">
                        <div className="large-button__icon">
                            🎓
                        </div>
                        <div className="large-button__title">
                            Student
                        </div>
                        <div>
                            Join a session
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Home;
