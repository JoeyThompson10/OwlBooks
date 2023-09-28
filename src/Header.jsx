import React, { useEffect, useState } from "react"; // Import useEffect and useState hooks
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
  MDBNavbarNav,
} from "mdb-react-ui-kit";

export default function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // Add a state for username

  useEffect(() => {
    // This function will be called when the component mounts and whenever the username in localStorage changes
    const storedUsername = localStorage.getItem("username"); // Retrieve the username from local storage
    if (storedUsername) {
      setUsername(storedUsername); // Set the username in state if it exists in local storage
    }
  }, []); // The empty array means this useEffect will only run on mount and unmount


  function navigateToDashboard() {
    if (localStorage.getItem("privilages") === "admin") {
      navigate("/AdminDashboard");
    } else if (localStorage.getItem("privilages") === "manager") {
      navigate("/ManagerDashboard");
    } else if(localStorage.getItem("privilages") === "baseUser") {
      navigate("/UserDashboard");
    }
  }

  function logOut() {
    localStorage.removeItem("privilages");
    localStorage.removeItem("username");
    navigate("/");
  }

  return (
    <>
      <MDBNavbar className="mx-auto py-1 bg-dark bg-gradient">
        <MDBContainer fluid className="m-0">
          <MDBNavbarNav className="me-auto">
            <MDBNavbarBrand href="#">
              <img
                className="App Logo" // Corrected 'class' to 'className'
                src="/assets/img/AppLogo.png"
                alt="OwlBooks Logo" // Corrected 'atl' to 'alt'
                height="65"
                onClick={() => navigate("/")}
              ></img>
              <MDBBtn
                className="p-0 fs-5"
                color="dark bg-gradient"
                onClick={() => navigate("/")}
              >
                OwlBooks
              </MDBBtn>

              {username && ( // Conditionally render the username if it exists
                <span className="text-light me-3">Welcome, {username}</span>
              )}

              <MDBBtn className="px-4 text-light" onClick={navigateToDashboard}>
                Home
              </MDBBtn>

              <MDBBtn className="px-4 text-light" onClick={logOut}>
                Log Out
              </MDBBtn>
            </MDBNavbarBrand>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}