import React from "react";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button type="button" onClick={()=>{navigate("/")}}>Home Page</button>
            
            <h1>
                Admin Dashboard
            </h1>

            <p>
                This is the admin dashboard page. System admins are able to complete admin specific tasks and abilities from here.
            </p>
        </div>
    );
}

export default AdminDashboard;