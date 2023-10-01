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
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


export default function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // Add a state for username
  const [state, setState] = React.useState({
    left: false,
  });


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

  // Function to toggle the drawer's open/close state
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
// Function to render the list of items in the drawer
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Dashboard', 'Accounts', 'Journal', 'Extra'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>

              {/* display text as primary content */}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <>
      <MDBNavbar stikcy className="mx-auto py-1 bg-dark bg-gradient">
        <MDBContainer fluid className="m-0">
          <MDBNavbarNav>
        <MDBNavbarBrand href="#" class="h-100 d-flex flex-row justify-content-between align-items-center">
              {/* for drawer */}
              <div>
                {['NavBar testing'].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}
              </div>

              <img
                className="App Logo" // Corrected 'class' to 'className'
                src="/assets/img/AppLogo.png"
                alt="OwlBooks Logo" // Corrected 'atl' to 'alt'
                height="65"
                onClick={() => navigate("/")}
              ></img>


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
              )}
            </MDBNavbarBrand>

     
            <MDBDropdown>
              <MDBDropdownToggle className="nav-link d-flex align-items-center">
                <img 
                  src="/assets/img/AppLogo.png" 
                  className="rounded-circle" 
                  height="22" 
                  alt="Portrait"
                />
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem href="#">My profile</MDBDropdownItem>
                <MDBDropdownItem href="#">Settings</MDBDropdownItem>
                <MDBDropdownItem href="#">Logout</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
      


          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}