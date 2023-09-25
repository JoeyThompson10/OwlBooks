import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import Header from './Header';
import Footer from "./Footer";
import { ResetPasswordFunction } from "./MongoDbClient";
import CryptoJS from 'crypto-js';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function handleResetPasswordSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            window.alert("Passwords do not match.");
            return;
        }

        const validationResult = validatePassword(password);
        if (validationResult) {
            window.alert(validationResult);
            return;
        }

        const hashedPassword = hashPassword(password);
        const response = await ResetPasswordFunction(hashedPassword);

        if (response && response.message.includes("Success")) {
            window.alert("Password reset successful. Please login with your new password.");
            navigate("/Login");
        } else {
            window.alert("Failed to reset password: " + response.message);
        }
    }

    function hashPassword(password) {
        return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
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
                            <form onSubmit={handleResetPasswordSubmit}>
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
