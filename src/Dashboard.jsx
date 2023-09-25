import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from './Header';


const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div>
            
            <h1>
                Dashboard
            </h1>

            <p>
                This is the dashboard page.
            </p>
        </div>
    );
}

export default Dashboard;