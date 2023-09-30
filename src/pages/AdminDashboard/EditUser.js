import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { MDBCard, MDBCardTitle, MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { getUserInfoFunction, setUserInfoFunction } from '../../MongoDbClient';


const EditUser = () => {
    const [isUserInfoVisible, setUserInfoVisible] = useState(false);

    const [username, setUsername] = useState("");

    const [newIsAdmin, setNewIsAdmin] = useState(false);
    const [newIsManager, setNewIsManager] = useState();
    const [newIsActive, setNewIsActive] = useState();
    const [newBadLogins, setNewBadLogins] = useState();

    function toggleUserInfoForm() {
        const userInfoForm = document.getElementById("userInfoForm");
        userInfoForm.style.display = "block";
        setUserInfoVisible(true);
    }

    async function getUserButton(e) {
        e.preventDefault();
        const response = await getUserInfoFunction(username);

        if (response.message === "User found!") {
            toggleUserInfoForm();
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
            username,
            newIsAdmin,
            newIsManager,
            newIsActive,
            newBadLogins
        );
        window.alert(response.message);
    }

    return (
        <MDBCard className="mb-4 pt-4">
            <MDBRow right className="p-3">
                <MDBCol md="4">
                    <form className="mx-4" onSubmit={getUserButton}>
                        <div>
                            <label>Username</label>
                            <input
                                type="text"
                                className="mx-3"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <MDBCardTitle>
                                <MDBBtn
                                    outline
                                    color="info"
                                    className="py-2 my-3"
                                    type="submit"
                                >
                                    Edit User Info
                                </MDBBtn>
                            </MDBCardTitle>
                        </div>
                    </form>

                    <form
                        id="userInfoForm"
                        onSubmit={setUserButton}
                        style={{ display: isUserInfoVisible ? "block" : "none" }}
                    >
                        <h6>Insert username below to make changes.</h6>
                        <br></br>

                        <div className="form-check mb-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="adminPrivilege"
                                checked={newIsAdmin}
                                onChange={(e) => setNewIsAdmin(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="adminPrivilege">
                                Admin Privilege
                            </label>
                        </div>

                        <div className="form-check mb-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="managerPrivilege"
                                checked={newIsManager}
                                onChange={(e) => setNewIsManager(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="managerPrivilege">
                                Manager Privilege
                            </label>
                        </div>

                        <div className="form-check mb-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="accountActivated"
                                checked={newIsActive}
                                onChange={(e) => setNewIsActive(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="accountActivated">
                                Account Activated
                            </label>
                        </div>

                        <MDBInput
                            label="Incorrect Logins"
                            className="mb-4"
                            group
                            type="number"
                            validate
                            value={newBadLogins}
                            onChange={(e) => setNewBadLogins(parseInt(e.target.value))}
                            required
                        />

                        <MDBBtn outline color="success" type="submit">
                            Save Changes
                        </MDBBtn>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBCard>
    );
}

export default EditUser;