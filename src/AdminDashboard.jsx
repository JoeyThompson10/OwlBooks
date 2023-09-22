import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CreateUser, LoginFunction, DisplayUsers, getUserInfo } from "./MongoDbClient";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit'; 

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');

    const [isUserInfoVisible, setUserInfoVisible] = useState(false);


    async function getUserInfo(e) {
        
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



    function toggleUserInfoForm() {
        const userInfoForm = document.getElementById('userInfoForm');
        userInfoForm.style.display = (userInfoForm.style.display === "block") ? "none" : "block";
        
        setUserInfoVisible(true);
    }
    
    
    async function getUserButton(e) {
        e.preventDefault();
        

        
        
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

            <label>
                Username
                <input
                    className="mb-2"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </label>
            <MDBCardTitle ><MDBBtn outline color="info" className='mx-3 mb-2' onClick={() => toggleUserInfoForm()}>Edit User Info</MDBBtn></MDBCardTitle>


            <form id="userInfoForm" onSubmit={getUserInfo} style={{ display: isUserInfoVisible ? "block" : "none" }}>
                            <MDBInput label="Username" className="mb-2" group type="text" validate error="wrong" success="right" value={newUsername} onChange={e => setNewUsername(e.target.value)} required />
                            <MDBInput label="Password" className="mb-2" group type="password" validate value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                            <MDBInput label="First Name" className="mb-2" group type="text" validate value={firstName} onChange={e => setFirstName(e.target.value)} />
                            <MDBInput label="Last Name" className="mb-2" group type="text" validate value={lastName} onChange={e => setLastName(e.target.value)} />
                            <MDBInput label="Address" className="mb-3" group type="text" validate value={address} onChange={e => setAddress(e.target.value)} />
                            <MDBInput label="Date of Birth" className="mb-4" group type="date" validate value={dob} onChange={e => setDob(e.target.value)} />
                            <MDBBtn outline color="success" type="submit" >Create User</MDBBtn>
                        </form>
            
            {/*<button type="button" onClick={()=>{navigate("/")}}>View Users</button>*/}
            
        </div>
    );
}

export default AdminDashboard;