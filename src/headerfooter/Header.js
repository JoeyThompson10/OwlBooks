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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Popover from '@mui/material/Popover';
import Calendar from "react-calendar";
import "../css/calendar.css";
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';


export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [username, setUsername] = useState(''); // Add a state for username
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
   // Drawer
  const handleDrawerOpen = () => { setOpen(true); };
  const handleDrawerClose = () => { setOpen(false); };
  const isAdmin = localStorage.getItem("privilages") === "admin";
  //calendar info
  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today. getDate();
  const currentDate = month + "/" + date + "/" + year;
  //Calendar popover
  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const open2 = Boolean(anchorEl);
  const id = open2 ? 'simple-popover' : undefined;
  
  const userItems = [
    { text: 'Edit User', icon: <EditIcon />, path: "/edituser" },
    { text: 'Create User', icon: <AddBoxIcon />, path: "/createuser" },
    { text: 'All Users', icon: <PeopleAltIcon />, path:"/allusers" },
    { text: 'Expired Password', icon: <KeyOffIcon />, path: "/expiredpasswords" }
  ];
  
  const accountItems = [
    { text: 'Add New Account', icon: <AccountBalanceIcon />, path: "/addaccount" },
    { text: 'Edit Existing Account', icon: <EditNoteIcon />, path: "/editexistingaccounts" },
    { text: 'All Accounts', icon: <AccountBalanceIcon />, path: "/allaccounts" }
  ];

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

  function HelpButton({ message }) {
    return (
        <button onClick={() => alert(message)}>
            Help
        </button>
    );
   }

  return (
    <>
      <MDBNavbar stikcy className="mx-auto py-1 bg-dark bg-gradient">
        <MDBContainer fluid className="m-0">
          <MDBNavbarNav>
          <MDBNavbarBrand href="#" class="h-100 d-flex flex-row justify-content-between align-items-center">

            <div>
              <IconButton
                  color="inherit"
                  className="p-3 mx-3"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerOpen}
                  sx={{ mr: 2 }}   >
                  <MenuIcon />  <h5 className="mt-2 mx-3">MENU</h5>
              </IconButton>
            <Drawer variant="persistent" anchor="left" open={open}>
              <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>

                {isAdmin && (
                  <>
                <Divider className="mx-2"/> Users
                <List>
                  {userItems.map((item, index) => (
                    <ListItem button key={item.text} onClick={() => { navigate({ pathname: item.path }); handleDrawerClose(); }}>
                      <ListItemButton>
                        <ListItemIcon>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                </>
                )}

                <Divider /> Accounts
                <List>
                  {accountItems.map((item, index) => (
                    <ListItem button key={item.text} onClick={() => { navigate({ pathname: item.path }); handleDrawerClose(); }}>
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