import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CreateUser, LoginFunction, DisplayUsers, getUserInfoFunction, setUserInfoFunction } from "./MongoDbClient";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit'; 
import { MongoDBCollection } from "realm/dist/bundle";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState();
    const [isManager, setIsManager] = useState();
    const [isActive, setIsActive] = useState();
    const [badLogins, setBadLogins] = useState();

    const [isUserInfoVisible, setUserInfoVisible] = useState(false);


    async function getUserInfoFromServer(username) {
        var response = await getUserInfoFunction(username);

    }
    async function setUserInfo(e) {
        var response = await setUserInfoFunction(username);
    }

    function clearUserInput() {
        setUsername('');
        setPassword('');
        setNewUsername('');
        setNewPassword('');
        setIsAdmin();
        setIsManager();
        setIsActive();
        setBadLogins();
    }



    function toggleUserInfoForm() {
        const userInfoForm = document.getElementById('userInfoForm');
        userInfoForm.style.display = "block"; // Always set the display to "block"
        setUserInfoVisible(true); // Set isUserInfoVisible to true
      }
    
    
    async function getUserButton(e) {
        e.preventDefault();
        var response = await getUserInfoFunction(username);

        if (response.message === "User found!"){
            toggleUserInfoForm();
            setNewUsername(response._id || "");
            setNewPassword(response.password || "");
            setIsAdmin(response.isAdmin || "false");
            setIsManager(response.isManager || "false");
            setIsActive(response.isActive || "false");
            setBadLogins(response.badLogins || "0");
        }

        window.alert(response.message);
        
    }

    async function setUserButton(e) {
        e.preventDefault();
        
        const query = {username: username};
        const update = {$set: {password: newPassword}};


        const result = await update(query, update);
    }

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

            <form onSubmit={getUserButton}>
            
            {/*<MDBCardTitle ><MDBBtn outline color="info" className='mx-3 mb-2' type="submit" >Edit User Info</MDBBtn></MDBCardTitle>*/}
                <div className="py-4 mt-3 ">
                    <label>Username</label>
                
                    <input
                        className="mb-2"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <MDBCardTitle ><MDBBtn outline color="info" className='mx-3 mb-2' type="submit" >Edit User Info</MDBBtn></MDBCardTitle>
                    {/*<MDBBtn rounded color="primary" className="mb-4 fs-5" type="submit">Edit User Info</MDBBtn>*/}
                </div>
            </form>

            <form id="userInfoForm" onSubmit={setUserButton} style={{ display: isUserInfoVisible ? "block" : "none" }}>
                            <MDBInput label="Username" className="mb-2" group type="text" validate error="wrong" success="right" value={newUsername} onChange={e => setNewUsername(e.target.value)} required />
                            <MDBInput label="Password" className="mb-2" group type="text" validate value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                            <MDBInput label="Admin Priviledge" className="mb-2" group type="text" validate value={isAdmin} onChange={e => setIsAdmin(e.target.value)} />
                            <MDBInput label="Manager Priviledge" className="mb-2" group type="text" validate value={isManager} onChange={e => setIsManager(e.target.value)} />
                            <MDBInput label="Account Activated" className="mb-3" group type="text" validate value={isActive} onChange={e => setIsActive(e.target.value)} />
                            <MDBInput label="Incorrect Logins" className="mb-4" group type="number" validate value={badLogins} onChange={e => setBadLogins(e.target.value)} />
                            <MDBBtn outline color="success" type="submit" >Save Changes</MDBBtn>
                        </form>
            
            {/*<button type="button" onClick={()=>{navigate("/")}}>View Users</button>*/}
            
        </div>
    );
}

export default AdminDashboard;