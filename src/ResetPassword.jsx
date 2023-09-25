import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from "./Footer";
import { ChangePassword } from "./MongoDbClient";
import CryptoJS from 'crypto-js';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
          const response = await ChangePassword(username, newPassword);
          setMessage(response.message);
        } catch (error) {
          setMessage('Error resetting password.');
          console.error(error);
        }

        if (password !== confirmPassword) {
            window.alert("Passwords do not match.");
            return;
        }
        const validationResult = validatePassword(password);
        if (validationResult) {
            window.alert(validationResult);
            return;
        }

        if (response && response.message.includes("Success")) {
            window.alert("Password reset successful. Please login with your new password.");
            navigate("/Login");
        } else {
            window.alert("Failed to reset password: " + response.message);
        }
    }

    function validatePassword(password) {
        if (password.length < 8) return "Password must be at least 8 characters long.";
        if (!/^[a-zA-Z]/.test(password)) return "Password must start with a letter.";
        if (!/[a-zA-Z]/.test(password)) return "Password must contain at least one letter.";
        if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) return "Password must contain at least one special character.";
        return null;
    }
    

    return (
        <MDBContainer fluid className="p-0 bg-warning bg-gradient text-dark">
        <Header/>
        <MDBRow center className="p-3">
            <MDBCol md="6">
                <MDBCard>
                    <MDBCardBody>
                        <form onSubmit={handlePasswordReset}>
                            <p className="h4 text-center py-4 fs-1">Reset Password</p>
                            <MDBInput label="New Password" group type="password" validate value={password} onChange={e => setPassword(e.target.value)} required />
                            <MDBInput label="Confirm Password" group type="password" validate value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                            <div className="text-center py-4 mt-3">
                                <MDBBtn rounded color="primary" className="mb-4" type="submit">Reset Password</MDBBtn>
                            </div>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
        <Footer/>
    </MDBContainer>
    );
}

export default ResetPassword;