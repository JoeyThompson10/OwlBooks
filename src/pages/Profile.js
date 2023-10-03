import React from "react";
// import { useNavigate } from 'react-router-dom';
import Header from '../headerfooter/Header';
import Footer from "../headerfooter/Footer";


const Profile = () => {
    // const navigate = useNavigate();
    return (
        <div>
            <Header />
            
            <h1>
                Profile Tester
            </h1>

            <p>
                This will eventually be the profile page.
            </p>
            <Footer />
        </div>
    );
}

export default Profile;