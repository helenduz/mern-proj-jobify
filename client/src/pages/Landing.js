import main from "../assets/images/main.svg"
import Wrapper from "../assets/wrappers/LandingPage"
import { Logo } from "../components/Components"
import { Link, Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Landing = () => {
    const { user } = useAppContext(); //check if user already logged in
    return (
        <>
            {user && <Navigate to="/" />}
            <Wrapper>
                <nav>
                    <Logo />
                </nav>
                <div className="container page">
                    <div className="info">
                        <h1>
                            Jobify: Your Personal <span>Job</span> Tracker
                        </h1>
                        <p>
                            Hi, welcome to my job tracker project! This app is
                            built with the{" "}
                            <span className="description-hl">
                                MERN (MongoDB, Express, React, NodeJS) stack
                            </span>
                            . Featuring a JWT user auth system, usage of advance
                            React concepts like context/reducer, and implemented
                            with modern best practices of full-stack
                            applications, this project has been my favorite so
                            far. Enjoy! &#128151;
                        </p>
                        <Link to="/register" className="btn btn-hero">
                            Login/Register
                        </Link>
                    </div>
                    <img
                        src={main}
                        alt="job hunt image"
                        className="img main-img"
                    ></img>
                </div>
            </Wrapper>
        </>
    );
};

export default Landing;