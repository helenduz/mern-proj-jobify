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
                <div className="container full-page">
                    <div className="info">
                        <h1>Job Tracking App</h1>
                        <p>Descriptions</p>
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