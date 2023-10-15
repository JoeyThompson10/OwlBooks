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
            <p>WELCOME</p>
            </MDBNavbarBrand>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}