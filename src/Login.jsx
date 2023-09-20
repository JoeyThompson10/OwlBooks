import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CreateUser, LoginFunction } from "./MongoDbClient";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');

    function toggleNewUserForm() {
        const newUserForm = document.getElementById('newUserForm');
        newUserForm.style.display = (newUserForm.style.display === "block") ? "none" : "block";
    }

    function clearUserInput() {
        setUsername('');
        setPassword('');
        setNewUsername('');
        setNewPassword('');
        setFirstName('');
        setLastName('');
        setAddress('');
        setDob('');
    }
  
    async function loginButton(e) {
        e.preventDefault();
        
        var response = await LoginFunction(username, password);

        if (response.message === "Login successful.") {
            navigate("/Dashboard");
        }
        if (response.message === "Login successful. Admin detected.") {
            navigate("/AdminDashboard");
        }
        
        window.alert(response.message);
    }

    async function createNewUser(e) {
        e.preventDefault();

        const response = await CreateUser(newUsername, newPassword);
        
        if (response && response.message.includes("Success")) {
            window.alert("User created. Please login.");
            toggleNewUserForm();
            clearUserInput();
        } else {
            window.alert("Failed to create user!");
        }
    }
  
    function forgotPassword() {
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
            <form onSubmit={loginButton}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>
                <button type="submit">Login</button>
                <button type="button" onClick={()=>{forgotPassword()}}>Forgot Password</button>
            </form>

            <hr/>

            <button onClick={()=>toggleNewUserForm()}>Create New User</button>
            <form id="newUserForm" onSubmit={createNewUser} style={{display: "none"}}>
            <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="newUsername" value={newUsername} onChange={e => setNewUsername(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" id="dob" value={dob} onChange={e => setDob(e.target.value)}/>
                </div>
                <button type="submit">Create User</button>
            </form>
        </div>
        </div>
    );
}

export default Login;
