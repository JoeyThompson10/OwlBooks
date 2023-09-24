import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CreateUser, LoginFunction } from "./MongoDbClient";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit'; 
import CryptoJS from 'crypto-js';


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
        
        var hashedPassword = hashPassword(password);
        var response = await LoginFunction(username, hashedPassword);

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
        const validationResult = validatePassword(newPassword);
        if (validationResult) {
            window.alert(validationResult);
            return;
        }

        e.preventDefault();

        var newHashedPassword = hashPassword(newPassword);
        const response = await CreateUser(newUsername, newHashedPassword, false, false, true, 0);
        //const validationResult = await validatePasswordWithRealm(newPassword);
    if (response) {
        window.alert(response.message); // Display the error message
        return;
    }
        
        if (response && response.message.includes("Success")) {
            window.alert("User created. Please login.");
            toggleNewUserForm();
            clearUserInput();
        } else {
            window.alert("Failed to create user!" + response.message);
        }
    }

    function hashPassword(password) {
        return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    }
  
    function forgotPassword() {
        console.log("Forgot password");
        alert("Password reset link sent!");
    }

    function validatePassword(password) {
        // Check if password is at least 8 characters long
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
    
        // Check if password starts with a letter
        if (!/^[a-zA-Z]/.test(password)) {
            return "Password must start with a letter.";
        }
    
        // Check if password contains at least one letter
        if (!/[a-zA-Z]/.test(password)) {
            return "Password must contain at least one letter.";
        }
    
        // Check if password contains at least one number
        if (!/[0-9]/.test(password)) {
            return "Password must contain at least one number.";
        }
    
        // Check if password contains at least one special character
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
            return "Password must contain at least one special character.";
        }
    
        return null; // Password is valid
    };
    

    return (
        <MDBContainer className="mt-3">
         <MDBBtn outline color='secondary' onClick={() => navigate("/")}>Home Page</MDBBtn>
        <MDBRow center>
            <MDBCol md="6">

                <MDBCard>
                    <MDBCardBody>
                        <form onSubmit={loginButton}>
                            <p className="h4 text-center py-4 fs-1">Get Started</p>
                            <MDBInput className="mb-4" label="Username" group type="text" validate error="wrong" success="right" value={username} onChange={e => setUsername(e.target.value)} />
                            <MDBInput label="Password" group type="password" validate value={password} onChange={e => setPassword(e.target.value)} />
                            <div className="text-center py-4 mt-3 ">
                                <MDBBtn rounded color="primary" className="mb-4 fs-5" type="submit">Login</MDBBtn>
                            </div>
                        </form>

                        <MDBBtn outline color="secondary" onClick={() => { forgotPassword() }}>Forgot Password</MDBBtn>
                    </MDBCardBody>
                </MDBCard>

                <MDBCard alignment='center' shadow='0' border='primary' background='white'>
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
