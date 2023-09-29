import React from "react";
// import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from "./Footer";


const Dashboard = () => {
    // const navigate = useNavigate();
    return (
        <div>
            <Header />
            
            <h1>
                Dashboard
            </h1>

            <p>
                This is the dashboard page.
            </p>
            <Footer />
        </div>
    );
}

export default Dashboard;