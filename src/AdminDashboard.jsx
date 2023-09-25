import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {CreateUser,LoginFunction,DisplayUsers,getUserInfoFunction,setUserInfoFunction,} from "./MongoDbClient";
import {MDBBtn,MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBInput,MDBTypography,MDBCardTitle,} from 'mdb-react-ui-kit';
import Header from "./Header";
import Footer from "./Footer";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newIsAdmin, setNewIsAdmin] = useState(false);
    const [newIsManager, setNewIsManager] = useState();
    const [newIsActive, setNewIsActive] = useState();
    const [newBadLogins, setNewBadLogins] = useState();

    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserFirstName, setNewUserFirstName] = useState('');
    const [newUserLastName, setNewUserLastName] = useState('');
    const [newUserAddress, setNewUserAddress] = useState('');
    const [newUserDOB, setNewUserDOB] = useState('');


    const [isUserInfoVisible, setUserInfoVisible] = useState(false);

    async function getUserInfoFromServer(username) {
    const response = await getUserInfoFunction(username);
    // Handle the response here
    }

    async function setUserInfo(username, newPassword) {
    // Handle setting user info here
    }

    {/*
    function clearUserInput() {
    setUsername('');
    setPassword('');
    setNewUsername('');
    setNewPassword('');
    setIsAdmin(false);
    setIsManager(false);
    setIsActive(true);
    setBadLogins(0);
    }
    */}
    function toggleUserInfoForm() {
        const userInfoForm = document.getElementById('userInfoForm');
        userInfoForm.style.display = "block";
        setUserInfoVisible(true);
    }

    async function getUserButton(e) {
    e.preventDefault();
    const response = await getUserInfoFunction(username);

    if (response.message === "User found!") {
        toggleUserInfoForm();
        setNewUsername(response._id || "");
        setNewPassword(response.password || "");
        setNewIsAdmin(response.isAdmin);
        setNewIsManager(response.isManager);
        setNewIsActive(response.isActive);
        setNewBadLogins(response.badLogins);
    }

    window.alert(response.message);
    }

    async function setUserButton(e) {
    e.preventDefault();
    const response = await setUserInfoFunction(
        newPassword,
        newIsAdmin,
        newIsManager,
        newIsActive,
        newBadLogins
    );
    window.alert(response.message);
    }

    async function handleCreateUser(e) {
    e.preventDefault();
    const response = await CreateUser(
        newPassword, 
        newUserEmail, 
        newUserFirstName, 
        newUserLastName, 
        newUserAddress, 
        newUserDOB
    );
    if (response.message) {
        window.alert(response.message);
    }
    // Clear form fields after submission for better UX
    setNewPassword('');
    setNewUserEmail('');
    setNewUserFirstName('');
    setNewUserLastName('');
    setNewUserAddress('');
    setNewUserDOB('');
    }


  return (
    <MDBContainer fluid className="p-0 bg-light text-dark">
        <Header />
        <h1><MDBTypography tag='div' className='display-1 mb-3 mx-4 text-warning'>
        Admin Dashboard
        </MDBTypography></h1>
        <MDBTypography className='lead mb-3 mx-4'>
        This is the admin dashboard page. System admins can complete admin-specific tasks and abilities from here.
        </MDBTypography>
        

        <MDBCard className="mb-3 pt-4">
        <MDBRow right className="p-3">
        <MDBCol md="4">
            <form className= "mx-4" onSubmit={getUserButton}>
            <div>
                <label >Username</label>
                <input
                type="text" className= "mx-3"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                />
                <MDBCardTitle>
                <MDBBtn outline color="info" className="py-2 my-3" type="submit">
                    Edit User Info
                </MDBBtn>
                </MDBCardTitle>
            </div>
            </form>

            <form className= "mx-4 py-3"id="userInfoForm" onSubmit={setUserButton} style={{ display: isUserInfoVisible ? "block" : "none" }}>
            <h6>Insert username below to make changes.</h6><br></br>
                <MDBInput label="Username" className="mb-2" group type="text" validate error="wrong" success="right" value={newUsername} onChange={e => setNewUsername(e.target.value)} required />
                <MDBInput label="Password" className="mb-2" group type="text" validate value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                {/*<MDBInput label="Admin Privilege" className="mb-2" group type="text" validate value={newIsAdmin} onChange={e => setIsAdmin(e.target.value === "true")} required/>*/}
                <div className="form-check mb-2"> <input className="form-check-input" type="checkbox" id="adminPrivilege" checked={newIsAdmin} onChange={e => setNewIsAdmin(e.target.checked)} /> <label className="form-check-label" htmlFor="adminPrivilege">Admin Privilege</label></div>
                {/*<MDBInput label="Manager Privilege" className="mb-2" group type="text" validate value={newIsManager} onChange={e => setIsManager(e.target.value === "true")} required />*/}
                <div className="form-check mb-2"> <input className="form-check-input" type="checkbox" id="managerPrivilege" checked={newIsManager} onChange={e => setNewIsManager(e.target.checked)} /> <label className="form-check-label" htmlFor="managerPrivilege">Manager Privilege</label></div>
                {/*<MDBInput label="Account Activated" className="mb-3" group type="text" validate value={newIsActive} onChange={e => setIsActive(e.target.value === "true")} required />*/}
                <div className="form-check mb-2"> <input className="form-check-input" type="checkbox" id="accountActivated" checked={newIsActive} onChange={e => setNewIsActive(e.target.checked)} /> <label className="form-check-label" htmlFor="accountActivated">Account Activated</label></div>
                <MDBInput label="Incorrect Logins" className="mb-4" group type="number" validate value={newBadLogins} onChange={e => setNewBadLogins(parseInt(e.target.value))} required />
                
                <MDBBtn outline color="success" type="submit">Save Changes</MDBBtn>
            </form>
        </MDBCol>
        </MDBRow>
        </MDBCard> 

    <MDBCard>
        <MDBRow right className="p-4">
        <MDBCol md="8">
        <MDBCardBody className='text-primary'>
            <form onSubmit={handleCreateUser}>
                <h2>Create New User</h2>
            
                <MDBInput
                    label="Email"
                    type="email" className="mb-3"
                    value={newUserEmail}
                    onChange={e => setNewUserEmail(e.target.value)}
                    required
                />
                <MDBInput
                    label="First Name"
                    type="text" className="mb-3"
                    value={newUserFirstName}
                    onChange={e => setNewUserFirstName(e.target.value)}
                    required
                />
                <MDBInput
                    label="Last Name"
                    type="text" className="mb-3"
                    value={newUserLastName}
                    onChange={e => setNewUserLastName(e.target.value)}
                    required
                />
                <MDBInput
                    label="Address"
                    type="text" className="mb-3"
                    value={newUserAddress}
                    onChange={e => setNewUserAddress(e.target.value)}
                    required
                />
                <MDBInput
                    label="Date of Birth"
                    type="date" className="mb-3"
                    value={newUserDOB}
                    onChange={e => setNewUserDOB(e.target.value)}
                    required
                />
                <MDBInput
                    label="Password"
                    type="password" className="mb-4"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                />
                <MDBBtn type="submit">Create User</MDBBtn>
            </form>
        </MDBCardBody>
        </MDBCol>
        </MDBRow>
    </MDBCard> 
    <Footer/>
    </MDBContainer>
  );
}

export default AdminDashboard;
