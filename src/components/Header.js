import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav } from "mdb-react-ui-kit";
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "./Sidebar";
import CalendarPopover from "./CalendarPopover";
import UserOptions from "./UserOptions";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';


export default function Header() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(''); // Add a state for username
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => { setOpen(true); };
  const handleDrawerClose = () => { setOpen(false); };
  const isAdmin = localStorage.getItem("privilages") === "admin";
  const isManager = localStorage.getItem("privilages") === "manager";

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
        <MDBNavbar className="mx-auto py-1 bg-dark bg-gradient">
            <MDBNavbarNav className="w-100 d-flex flex-row align-items-center">

                {/* Left Section - Menu Button, Calendar */}
                <div className="d-flex align-items-center">
                    <Tooltip title="Open Menu">
                        <IconButton onClick={handleDrawerOpen} style={{ color: 'white', marginRight: '15px' }}>
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>

                    <div>
                        <CalendarPopover />
                    </div>
                </div>

                {/* Center Section - Logo */}
                <div className="flex-grow-1 d-flex justify-content-center">
                    <MDBNavbarBrand className="m-0 p-0">
                        <Tooltip title="Go to Home">
                            <img
                                src="/assets/img/AppLogo.png"
                                alt="Logo"
                                height="65"
                                onClick={() => navigate("/")}
                            />
                        </Tooltip>
                    </MDBNavbarBrand>
                </div>

                {/* Right Section - User Greeting and Options */}
                <div className="d-flex align-items-center">
                    <Tooltip title="Your Username">
                        <p className="m-0 mr-2" style={{ color: 'white' }}>Hi, {username}</p>
                    </Tooltip>
                    
                    <UserOptions logOut={logOut} navigateToDashboard={navigateToDashboard} />
                </div>

            </MDBNavbarNav>
        </MDBNavbar>
        <Drawer variant="persistent" anchor="left" open={open}>
            <Sidebar open={open} handleDrawerClose={handleDrawerClose} isAdmin={isAdmin} isManager={isManager}/>
        </Drawer>
    </>
);

}