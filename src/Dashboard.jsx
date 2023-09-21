import React from "react";
import { useNavigate } from 'react-router-dom';
import { MDBBtn} from 'mdb-react-ui-kit'; 

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div>
            <MDBBtn outline color='secondary' onClick={() => navigate("/")}>Home Page</MDBBtn>
            
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