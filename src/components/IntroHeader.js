import React from "react";
import { useNavigate } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav } from "mdb-react-ui-kit";
import Sidebar from "./Sidebar";
import CalendarPopover from "./CalendarPopover";
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';


export default function IntroHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleDrawerClose = () => { setOpen(false); };
  const isAdmin = localStorage.getItem("privilages") === "admin";
  const isManager = localStorage.getItem("privilages") === "manager";

  return (
    <>
      <MDBNavbar className="mx-auto py-1 bg-dark bg-gradient">
        <MDBNavbarNav className="w-100 d-flex flex-row align-items-center">

          {/* Left Section - Calendar */}
          <div className="d-flex align-items-center">
            <CalendarPopover />
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
            <p className="m-0 mr-2" style={{ color: 'white' }}>OwlBooks</p>
          </div>

        </MDBNavbarNav>
      </MDBNavbar>
      <Drawer variant="persistent" anchor="left" open={open}>
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} isAdmin={isAdmin} isManager={isManager} />
      </Drawer>
    </>
  );
}