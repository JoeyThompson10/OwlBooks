import React from "react";
import { useNavigate } from 'react-router-dom';
import {MDBContainer, MDBNavbar, MDBNavbarBrand, MDBBtn, MDBNavbarItem, MDBNavbarLink} from 'mdb-react-ui-kit';



export default function Header() {
    const navigate = useNavigate();


  return (
    <>
       <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>

          <MDBNavbarBrand href='#'>
            OwlBooks
          </MDBNavbarBrand>
          <MDBBtn className='mx-2' color='dark' onClick={() => navigate("/")}>Home Page</MDBBtn>

        <MDBNavbarItem>
        <MDBNavbarLink href='#'>Features</MDBNavbarLink>
        </MDBNavbarItem>

        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
