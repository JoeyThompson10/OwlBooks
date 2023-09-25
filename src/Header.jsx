import React from "react";
import { useNavigate } from 'react-router-dom';
import {MDBContainer, MDBNavbar, MDBNavbarBrand, MDBBtn, MDBNavbarNav, MDBNavbarItem} from 'mdb-react-ui-kit';




export default function Header() {
    const navigate = useNavigate();


  return (
    <>
       <MDBNavbar  className="mx-auto py-1 bg-dark bg-gradient" >
        <MDBContainer fluid className="m-0">
          <MDBNavbarNav className="me-auto">
          
          <MDBNavbarBrand href='#'>
          <img class="App Logo" src="/assets/img/AppLogo.png" atl="OwlBooks Logo"  className= "m-0" height="65" onClick={() => navigate("/")} ></img>
          <MDBBtn className= "p-0 fs-5" color="dark bg-gradient" onClick={() => navigate("/")}>OwlBooks</MDBBtn>

          <MDBNavbarItem className="px-4 text-light">
            Feature 
          </MDBNavbarItem>
          </MDBNavbarBrand>
          

          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
