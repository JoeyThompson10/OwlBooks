import React from "react";
import { useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button type="button" onClick={()=>{navigate("/")}}>Home Page</button>
            
            <h1>
                Manager Dashboard
            </h1>
            
            <p>
                This is the manager dashboard page. Managers can complete manager specific tasks and abilities from here.
            </p>
        </div>
    );
}

export default ManagerDashboard;