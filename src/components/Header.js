import React, { useEffect, useState } from "react"; // Import useEffect and useState hooks
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
  MDBNavbarNav,
  MDBDropdownItem, MDBDropdownToggle, MDBDropdownMenu, MDBDropdown
} from "mdb-react-ui-kit";
// Mui Elements
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Popover from '@mui/material/Popover';
import Calendar from "react-calendar";
import "../css/calendar.css";
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "./Sidebar";


export default function Header() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(''); // Add a state for username
  const [open, setOpen] = React.useState(false);
  // const [activeTab, setActiveTab] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // Drawer
  const handleDrawerOpen = () => { setOpen(true); };
  const handleDrawerClose = () => { setOpen(false); };
  const isAdmin = localStorage.getItem("privilages") === "admin";
  //calendar info
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = month + "/" + date + "/" + year;
  //Calendar popover
  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const open2 = Boolean(anchorEl);
  const id = open2 ? 'simple-popover' : undefined;

  useEffect(() => {
    // This function will be called when the component mounts and whenever the username in localStorage changes
    const storedUsername = localStorage.getItem("username"); // Retrieve the username from local storage
    if (storedUsername) {
      setUsername(storedUsername); // Set the username in state if it exists in local storage
    }
  }, []); // The empty array means this useEffect will only run on mount and unmount

  // function getDate() {
  //   const today = new Date();
  //   const month = today.getMonth() + 1;
  //   const year = today.getFullYear();
  //   const date = today.getDate();
  //   return `${year}/${month}/${date}`;
  // }

  function navigateToDashboard() {
    if (localStorage.getItem("privilages") === "admin") {
      navigate("/AdminDashboard");
    } else if (localStorage.getItem("privilages") === "manager") {
      navigate("/ManagerDashboard");
    } else if (localStorage.getItem("privilages") === "baseUser") {
      navigate("/UserDashboard");
    }
  }

  function logOut() {
    localStorage.removeItem("privilages");
    localStorage.removeItem("username");
    navigate("/");
  }

  // function HelpButton({ message }) {
  //   return (
  //     <button onClick={() => alert(message)}>
  //       Help
  //     </button>
  //   );
  // }

  return (
    <>
      <MDBNavbar stikcy className="mx-auto py-1 bg-dark bg-gradient">
        <MDBContainer fluid className="m-0">
          <MDBNavbarNav>
            <MDBNavbarBrand href="#" class="h-100 d-flex flex-row justify-content-between align-items-center">

              <div>
                <Tooltip title="Open Menu">
                  <IconButton
                    color="inherit"
                    className="p-3 mx-3"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerOpen}
                    sx={{ mr: 2 }}   >
                    <MenuIcon />  <h5 className="mt-2 mx-3">MENU</h5>
                  </IconButton>
                </Tooltip>
                <Drawer variant="persistent" anchor="left" open={open}>
                  <Sidebar open={open} handleDrawerClose={handleDrawerClose} isAdmin={isAdmin} />
                </Drawer>
              </div>

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

              <p>Hi, {username}</p>
              {/* For User profile icon */}
              <Tooltip title="User Options">
                <MDBDropdown className="bg-dark bg-gradient">
                  <MDBDropdownToggle className="bg-dark bg-gradient nav-link">
                    <img
                      src="/assets/img/AppLogo.png" //change this image for user image
                      className="rounded-circle bg-dark bg-gradient"
                      height="45"
                      alt="Portrait"
                    />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    {/* TDB My profile and logout */}
                    <MDBDropdownItem href="#">My profile</MDBDropdownItem>
                    <MDBDropdownItem href="#" onClick={logOut}>Logout</MDBDropdownItem>
                    <MDBDropdownItem href="#" onClick={navigateToDashboard}>Home</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </Tooltip>


            </MDBNavbarBrand>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}