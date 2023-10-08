import React from 'react';
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
  MDBNavbarNav,
} from "mdb-react-ui-kit";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Popover from '@mui/material/Popover';
import Calendar from "react-calendar";
import "../css/calendar.css";
import Tooltip from '@mui/material/Tooltip';

export default function IntroHeader({ currentPage }) {
    const navigate = useNavigate();

  //calendar
  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today. getDate();
  const currentDate = month + "/" + date + "/" + year;

  //Popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const open2 = Boolean(anchorEl);
  const id = open2 ? 'simple-popover' : undefined;

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}/${month}/${date}`;
  }

  function HelpButton({ message }) {
    return (
        <button onClick={() => alert(message)}>
            Help
        </button>
    );
   }

  //This Header does not have loggin elements.
  return (
    <>
      <MDBNavbar stikcy className="mx-auto py-1 bg-dark bg-gradient">
        <MDBContainer fluid className="m-0">
          <MDBNavbarNav>
          <MDBNavbarBrand href="#" class="h-100 d-flex flex-row justify-content-between align-items-center">

                {/* For Calender */}
            <div>
            <Tooltip title="View Calendar"> 
                <MDBBtn outline rounded aria-describedby={id} variant="contained" onClick={handleClick}>
                <CalendarMonthIcon color="bg-primary" />
                </MDBBtn>
                </Tooltip>
                <Popover
                id={id}
                open={open2}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                >
                <div>
                    <h6>Today's Date</h6>
                    <p>{currentDate}</p>
                    <Calendar />
                </div>
                </Popover>
            </div>

            {/* For Logo */}
            <Tooltip title="Go to Home">
            <img
              className="App Logo" 
              src="/assets/img/AppLogo.png"
              alt="OwlBooks Logo"
              height="65"
              onClick={() => navigate("/")}
            ></img>
            </Tooltip>

            <div>
            {/* Conditional rendering for HelpButton */}
            {currentPage === 'SplashScreen' && <HelpButton message="This is the splash screen. Click Login to start." />}
            {currentPage === 'Login' && <HelpButton message="Enter your credentials to login. If you do not have a user, create one. After you create a user you new username will be sent to your email you used to register. 
                                If you forgot you password, select the forgot password button to continue. " />}
            {currentPage === 'App' && <HelpButton message="This is the main app. Click the Owl in the taskto go back to the Home Page" />}
            {currentPage === 'ResetPassword' && <HelpButton message="After you reset your password go to the login page to login in with the new password. 
                                If you do not want to reset you password anymore, click on the owl in the taskbar to go back to Home Page." />}
            {/* Add similar conditions for other pages as needed */}
            </div>

            </MDBNavbarBrand>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}