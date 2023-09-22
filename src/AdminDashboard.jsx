import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CreateUser, LoginFunction, DisplayUsers } from "./MongoDbClient";

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
                    <input type="text" id="username" required value></input>
                </div>
                <button type="submit">Submit</button>
            </form>



            
            {/*<button type="button" onClick={()=>{navigate("/")}}>View Users</button>*/}
            
        </div>
    );
}

export default AdminDashboard;