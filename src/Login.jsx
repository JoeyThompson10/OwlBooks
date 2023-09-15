import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    function toggleNewUserForm() {
        const newUserForm = document.getElementById('newUserForm');
        newUserForm.style.display = (newUserForm.style.display === "block") ? "none" : "block";
    }
  
    function login() {
        // TODO: Authenticate user
        // On successful login, display user's name and picture at the top right
        navigate("/dashboard")
        window.alert("Login successful!");
    }
  
    function createNewUser() {
        // TODO: Collect user data and send request to backend for creation
        // Send email to admin for approval
        window.location.reload();
        window.alert("User created!");
  
    }
  
    function forgotPassword() {
        // TODO: Check security questions and send reset password link to user email
        console.log("Forgot password");
        alert("Password reset link sent!");
    }
    
    return (
        <div>
            <button type="button" onClick={()=>{navigate("/")}}>Home Page</button>
        <h1>
            Login
        </h1>

        <div className="container">
            <form onSubmit={()=>login()}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required/>
                </div>
                <button type="submit">Login</button>
                <button type="button" onClick={()=>{forgotPassword()}}>Forgot Password</button>
            </form>

            <hr/>

            <button onClick={()=>toggleNewUserForm()}>Create New User</button>
            <form id="newUserForm" style={{display: "none"}}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" id="dob" required/>
                </div>
                <button onClick={()=>createNewUser()}type="submit">Create User</button>
            </form>
        </div>
        </div>
    );
}

export default Login;