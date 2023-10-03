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
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Popover from '@mui/material/Popover';
import Calendar from "react-calendar";
import "../css/calendar.css";



export default function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // Add a state for username
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  //calendar
  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today. getDate();
  const currentDate = month + "/" + date + "/" + year;
  // Drawer
  const handleDrawerOpen = () => { setOpen(true); };
  const handleDrawerClose = () => { setOpen(false); };
  //Calendar
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}/${month}/${date}`;

  }

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

  return (
    <>
      <MDBNavbar stikcy className="mx-auto py-1 bg-dark bg-gradient">
        <MDBContainer fluid className="m-0">
          <MDBNavbarNav>
          <MDBNavbarBrand href="#" class="h-100 d-flex flex-row justify-content-between align-items-center">

          {/* for drawer */}
          <div class="flex-sm-shrink-1">
            <Box sx={{ display: 'flex'}}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
              >
              <MenuIcon />
              </IconButton>
              <Drawer
                sx={{
                  width: 50,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                   width: 240,
                    boxSizing: 'border-box',
                  },
                }}
                variant="persistent"
                anchor="left"
                open={open}
                >
                <div>
                  <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </div>
                <Divider />
                  <List>
                    {[{ text: 'Dashboard', icon: <InboxIcon /> },
                      { text: 'Accounts', icon: <MailIcon /> },
                      { text: 'Journal', icon: <MailIcon /> },
                      { text: 'Documents', icon: <InboxIcon /> }, ].map((item) => (
                      <ListItem key={item.text} disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                        {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                    
                  <List>
                    {[{ text: 'Users (AdminOnly)', icon: <InboxIcon /> }, ].map((item) => (
                      <ListItem key={item.text} disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                        {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Drawer>
              </Box>
            </div>

            {/* For Calender */}
          <div>
            <MDBBtn outline rounded aria-describedby={id} variant="contained" onClick={handleClick}>
            <CalendarMonthIcon color="bg-primary" />
            </MDBBtn>
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
            <img
              className="App Logo" 
              src="/assets/img/AppLogo.png"
              alt="OwlBooks Logo"
              height="65"
              onClick={() => navigate("/")}
            ></img>

                  {/* Not Wokring, Pending 
              {username && ( // Conditionally render the username if it exists
                  <>
                  <span className="text-light me-3">Welcome, {username}</span>
                  <MDBBtn className="px-4 text-light" onClick={navigateToDashboard}>  
                    Home
                  </MDBBtn>
                  <MDBBtn className="px-4 text-light" onClick={logOut}>
                    Log Out
                  </MDBBtn>
                  </>
              )} */}
<p>Hi, {username}</p>
             {/* For User profile icon */}
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
      

            </MDBNavbarBrand>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}