import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { CreateUser, LoginFunction, sendEmail } from "../MongoDbClient";
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

    const [isForgotPasswordVisible, setForgotPasswordVisible] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

    const navigateToDashboard = useCallback(() => {
        if (localStorage.getItem("privilages")) {
            navigate("/dashboard");
        }
    }, [navigate]); // Added dependencies array with 'navigate'

    useEffect(() => {
        navigateToDashboard();
    }, [navigateToDashboard]); // This now refers to the memoized version of the function


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

        if (response.message.includes("Login successful.")) {
            localStorage.setItem("username", username);
            localStorage.setItem("privilages", response.privilages);
            console.log(`USERNAME: ${localStorage.getItem("username")}`)
            navigateToDashboard();
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
        const response = await CreateUser(newHashedPassword, email, firstName, lastName, address, dob);

        if (response && response.message.includes("Success")) {
            window.alert("User created: " + createUsername() + ". Please Login with your new username and password.");
            toggleNewUserForm();
            clearUserInput();
            return;
        } else {
            window.alert("Failed to create user: " + response.message);
        }
    }

    function createUsername() {
        const firstNameLetterLowercase = firstName.charAt(0).toLowerCase();
        const lastNameLowercase = lastName.toLowerCase();

        const today = new Date();
        const month = today.getMonth() + 1;
        const twoDigitMonth = (month < 10 ? '0' : '') + month;
        const twoDigitYear = today.getFullYear().toString().substring(2, 4);

        let username = firstNameLetterLowercase + lastNameLowercase + twoDigitMonth + twoDigitYear;

        return username;
    }

    function hashPassword(password) {
        return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    }

    async function handleForgotPasswordSubmit() {
        const subect = "Password Reset";
        const body = `
            <html>
                <body style="font-family: Arial, sans-serif;">
                    <p>Hello,</p>
                    <p>You have requested to reset your password. Please click the link below to proceed:</p>
                    <p><a href="https://owlbooks-swe4713.netlify.app/ResetPassword" target="_blank" style="color: #3498db; text-decoration: none;">Reset Your Password</a></p>
                    <p>If you did not request this, you can safely ignore this email.</p>
                </body>
            </html>
        `;

        const res = sendEmail(forgotPasswordEmail, subect, body);
        console.log(JSON.stringify(res.message));
        setForgotPasswordVisible(false);
        alert("Password reset link sent!");
    }

    function forgotPassword() {
        setForgotPasswordVisible(true);
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
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)) {
            return "Password must contain at least one special character.";
        }

        return null; // Password is valid
    };

    const LoginInstructions = () => {
        return (
            <MDBCard className="mt-3">
                <MDBCardBody>
                    <MDBCardTitle>Login Instructions</MDBCardTitle>
                    <MDBCardText>
                        Use the following credentials to login as different users:<br />
                        <strong>User:</strong> username: user1, password: user1<br />
                        <strong>Manager:</strong> username: manager1, password: manager1<br />
                        <strong>Admin:</strong> username: admin1, password: admin1
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        );
    };
    

    return (
        <MDBContainer fluid className="p-0 bg-warning bg-gradient text-dark">
            <MDBRow center className="p-3">
                <MDBCol md="5">

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

                    {/* Login Instructions Panel */}
                    <LoginInstructions />

                    <MDBCard alignment='center' shadow='0' border='primary' background='white' className="mt-5 mb-5">
                        <MDBCardBody className='text-primary'>
                            <MDBCardTitle ><MDBBtn outline color="info" className='mx-3 mb-2' onClick={() => toggleNewUserForm()}>Create New User</MDBBtn></MDBCardTitle>
                            
                            <MDBCardText>
                                <form id="newUserForm" onSubmit={createNewUser} style={{ display: isSignupVisible ? "block" : "none" }}>
                                    <MDBInput label="Email" className="mb-3" group type="email" validate error="wrong" success="right" value={email} onChange={e => setEmail(e.target.value)} required />
                                    <MDBInput label="Password" className="mb-3" group type="password"
                                        title="Password must be at least 8 characters long, start with a letter, contain at least one letter, have at least one number, and contain at least one special character."
                                        validate value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                                    <MDBInput label="First Name" className="mb-3" group type="text" validate value={firstName} onChange={e => setFirstName(e.target.value)} required />
                                    <MDBInput label="Last Name" className="mb-3" group type="text" validate value={lastName} onChange={e => setLastName(e.target.value)} required />
                                    <MDBInput label="Address" className="mb-4" group type="text" validate value={address} onChange={e => setAddress(e.target.value)} required />
                                    <MDBInput label="Date of Birth" className="mb-5" group type="date" validate value={dob} onChange={e => setDob(e.target.value)} required />
                                    <MDBBtn outline color="success" type="submit" >Create User</MDBBtn>
                                </form>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>

                    
                </MDBCol>

                
            </MDBRow>

            {/* Forgot Password Modal */}
            {isForgotPasswordVisible && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Forgot Password</h5>
                                <button type="button" className="btn-close" onClick={() => setForgotPasswordVisible(false)}></button>
                            </div>
                            <div className="modal-body">
                                <MDBInput label="Enter your email" group type="email" value={forgotPasswordEmail} onChange={e => setForgotPasswordEmail(e.target.value)} />
                            </div>
                            <div className="modal-footer">
                                <MDBBtn color="secondary" onClick={() => setForgotPasswordVisible(false)}>Close</MDBBtn>
                                <MDBBtn color="primary" onClick={handleForgotPasswordSubmit}>Submit</MDBBtn>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </MDBContainer>
    );
}

export default Login;
