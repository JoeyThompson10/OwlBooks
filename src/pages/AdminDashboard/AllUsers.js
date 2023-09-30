import React, { useState, useEffect } from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBRow,
    MDBCol
} from "mdb-react-ui-kit";
import { GetAllUsers, SuspendUser, sendEmail } from '../../MongoDbClient';
import { useNavigate } from "react-router-dom";


const AllUsers = () => {
    const navigate = useNavigate();

    const [allUsers, setAllUsers] = useState([]);
    const [currentSuspendUsername, setCurrentSuspendUsername] = useState("");
    const [isEmailModalVisible, setEmailModalVisible] = useState(false);
    const [customEmailSubject, setCustomEmailSubject] = useState("");
    const [customEmailBody, setCustomEmailBody] = useState("");
    const [currentEmailRecipient, setCurrentEmailRecipient] = useState("");
    const [isSuspendModalVisible, setSuspendModalVisible] = useState(false);
    const [suspensionDays, setSuspensionDays] = useState("");

    useEffect(() => {
        handleGetAllUsers();
    }, []);

    async function handleGetAllUsers() {
        const usersReport = await GetAllUsers();
        setAllUsers(usersReport);
    }

    function openEmailModal(email) {
        setCurrentEmailRecipient(email);
        setEmailModalVisible(true);
    }

    function openSuspendModal(username) {
        setCurrentSuspendUsername(username);
        setSuspendModalVisible(true);
    }

    async function handleSuspendUser() {
        const response = await SuspendUser(currentSuspendUsername, suspensionDays);
        console.log("currentSuspendUsername: " + currentSuspendUsername);
        const responseMessage = JSON.stringify(response.message);
        window.alert(responseMessage);

        // Close the modal after suspension
        setSuspendModalVisible(false);
        navigate(0);
    }

    async function handleSendCustomEmail() {
        const response = await sendEmail(
            currentEmailRecipient,
            customEmailSubject,
            customEmailBody
        );
        if (response.success) {
            window.alert("Email sent successfully.");
        } else {
            window.alert("Failed to send email.");
        }

        // Close the modal after sending the email
        setEmailModalVisible(false);
    }

    return (

        <MDBCard className="mb-3 pt-4">
            <MDBRow className="mb-3 pt-4 mx-2">
                <MDBCol>
                    {allUsers.length > 0 && (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th>Manager</th>
                                    <th>Active</th>
                                    <th>Incorrect Logins</th>
                                    <th>Days Suspended</th>
                                    <th>Password Age (days)</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? "Yes" : "No"}</td>
                                        <td>{user.isManager ? "Yes" : "No"}</td>
                                        <td>{user.isActive ? "Yes" : "No"}</td>
                                        <td>{user.badLogins}</td>
                                        <td>{user.daysSuspended}</td>
                                        <td>{user.passwordTimeout}</td>
                                        <td>
                                            <MDBBtn className="p-2 mx-3"
                                                size="sm"
                                                onClick={() => openEmailModal(user.email)}
                                            >
                                                Send Email
                                            </MDBBtn>
                                            <MDBBtn className="p-2"
                                                size="sm"
                                                onClick={() => openSuspendModal(user._id)}
                                            >
                                                Suspend
                                            </MDBBtn>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </MDBCol>
            </MDBRow>

            {isEmailModalVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            width: "400px",
                            margin: "100px auto",
                            padding: "20px",
                            background: "white",
                            borderRadius: "10px",
                        }}
                    >
                        <h3>Customize Email</h3>
                        <label>Subject:</label>
                        <input
                            type="text"
                            value={customEmailSubject}
                            onChange={(e) => setCustomEmailSubject(e.target.value)}
                        />
                        <label>Body:</label>
                        <textarea
                            value={customEmailBody}
                            onChange={(e) => setCustomEmailBody(e.target.value)}
                        />
                        <button onClick={handleSendCustomEmail}>Send</button>
                        <button onClick={() => setEmailModalVisible(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {isSuspendModalVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            width: "400px",
                            margin: "100px auto",
                            padding: "20px",
                            background: "white",
                            borderRadius: "10px",
                        }}
                    >
                        <h3>Suspend User: {currentSuspendUsername}</h3>
                        <label>Number of days:</label>
                        <input
                            type="number"
                            value={suspensionDays}
                            onChange={(e) => setSuspensionDays(e.target.value)}
                        />
                        <button onClick={handleSuspendUser}>Suspend</button>
                        <button onClick={() => setSuspendModalVisible(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </MDBCard>
    );
};

export default AllUsers;