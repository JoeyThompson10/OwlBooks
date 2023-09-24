import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CreateUser, LoginFunction, isCurrentUser } from "./MongoDbClient";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit'; 
import CryptoJS from 'crypto-js';


const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
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
        setEmail('');
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
        e.preventDefault();

        const validationResult = validatePassword(newPassword);
        if (validationResult) {
            window.alert(validationResult);
            return;
        }

        e.preventDefault();

        var newHashedPassword = hashPassword(newPassword);
        const response = await CreateUser(createUsername(), newHashedPassword, email, firstName, lastName, address, dob);
        
        if (response && response.message.includes("Success")) {
            window.alert("User created. Please login.");
            toggleNewUserForm();
            clearUserInput();
            return;
        } else {
            window.alert("Failed to create user: " + response.message);
        }
    }

    function createUsername() {
        // Creates a username with the first name initial, the full last name, and a four digit (two-digit month and two digit year) of when the account is created

        const firstNameLetterLowercase = firstName.charAt(0).toLowerCase();
        const lastNameLowercase = lastName.toLowerCase();

        const today = new Date();
        const month = today.getMonth();
        const twoDigitMonth = (month < 10 ? '0' : '') + month;
        const twoDigitYear = today.getFullYear().toString().substring(2, 4);

        let username = firstNameLetterLowercase + lastNameLowercase + twoDigitMonth + twoDigitYear;

        return username;
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
                            <MDBInput label="Email" className="mb-2" group type="email" validate error="wrong" success="right" value={email} onChange={e => setEmail(e.target.value)} required />
                            <MDBInput label="Password" className="mb-2" group type="password" validate value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                            <MDBInput label="First Name" className="mb-2" group type="text" validate value={firstName} onChange={e => setFirstName(e.target.value)} required />
                            <MDBInput label="Last Name" className="mb-2" group type="text" validate value={lastName} onChange={e => setLastName(e.target.value)} required />
                            <MDBInput label="Address" className="mb-3" group type="text" validate value={address} onChange={e => setAddress(e.target.value)} required />
                            <MDBInput label="Date of Birth" className="mb-4" group type="date" validate value={dob} onChange={e => setDob(e.target.value)} required />
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
