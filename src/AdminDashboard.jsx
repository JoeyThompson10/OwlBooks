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

            <p>
                Insert username below to make changes.
            </p>

            <form>
                <div class="form-group">
                    <label for="username">Username</label>
                    {/*<input type="text" id="username"></input>*/}
                    <input type="text" class="form-control mb-4" error="wrong" success="right" value=""></input>
                    <button class="ripple ripple-surface ripple-surface-light btn btn-primary btn-rounded mb-4 fs-5" role="button" type="submit">Submit</button>
                </div>
                
                
            </form>

        </div>
    );
}

export default AdminDashboard;