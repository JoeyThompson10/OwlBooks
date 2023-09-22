import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { CreateUser, LoginFunction } from "./MongoDbClient";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit'; 


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

    const [isSignupVisible, setSignupVisible] = useState(false);


    function toggleNewUserForm() {
        const newUserForm = document.getElementById('newUserForm');
        newUserForm.style.display = (newUserForm.style.display === "block") ? "none" : "block";
        
        setSignupVisible(!isSignupVisible);
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
        if (response.message === "Login successful. Manager detected.") {
            navigate("/ManagerDashboard");
        }
        
        window.alert(response.message);
    }

    async function createNewUser(e) {
        e.preventDefault();

        const response = await CreateUser(newUsername, newPassword, false, false, true, 0);
        
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
        <MDBContainer className="p-3 mb-2 bg-warning bg-gradient text-dark rounded-5">
            <div>
                <Header/>
            </div>

            <MDBRow center className="p-3">
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <form onSubmit={loginButton}>
                                <p className="h4 text-center py-4 fs-1">Get Started</p>
                                <MDBInput className="mb-4" label="Username" group type="text" validate error="wrong" success="right" value={username} onChange={e => setUsername(e.target.value)} />
                                <MDBInput label="Password" group type="password" validate value={password} onChange={e => setPassword(e.target.value)} />
                                <div className="text-center py-4 mt-3 ">
                                    <MDBBtn rounded color="primary" className="mb-4" type="submit">Login</MDBBtn>
                                </div>
                            </form>

                            <MDBBtn outline color="secondary" onClick={() => { forgotPassword() }}>Forgot Password</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>

                <MDBCard alignment='center' shadow='0' border='primary' background='white' className="mt-3">
                    <MDBCardBody className='text-primary'>
                    <MDBCardTitle ><MDBBtn outline color="info" className='mx-3 mb-2' onClick={() => toggleNewUserForm()}>Create New User</MDBBtn></MDBCardTitle>
                        <MDBCardText>
                        <form id="newUserForm" onSubmit={createNewUser} style={{ display: isSignupVisible ? "block" : "none" }}>
                            <MDBInput label="Username" className="mb-2" group type="text" validate error="wrong" success="right" value={newUsername} onChange={e => setNewUsername(e.target.value)} required />
                            <MDBInput label="Password" className="mb-2" group type="password" validate value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                            <MDBInput label="First Name" className="mb-2" group type="text" validate value={firstName} onChange={e => setFirstName(e.target.value)} />
                            <MDBInput label="Last Name" className="mb-2" group type="text" validate value={lastName} onChange={e => setLastName(e.target.value)} />
                            <MDBInput label="Address" className="mb-3" group type="text" validate value={address} onChange={e => setAddress(e.target.value)} />
                            <MDBInput label="Date of Birth" className="mb-4" group type="date" validate value={dob} onChange={e => setDob(e.target.value)} />
                            <MDBBtn outline color="success" type="submit" >Create User</MDBBtn>
                        </form>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>

            </MDBCol>
        </MDBRow>
    </MDBContainer>
    );
}

export default Login;
