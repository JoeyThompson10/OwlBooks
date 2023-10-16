import React from "react";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import 'react-tabs/style/react-tabs.css';

const AdminDashboard = () => {

  return (
    <MDBContainer fluid className="p-0 bg-warning text-dark ">
      <h1>
        <MDBTypography tag="div" className="display-1 mb-3 mx-4 text-light">
          Admin Dashboard
        </MDBTypography>
      </h1>
      <MDBTypography className="lead mb-3 mx-4">
        This is the admin dashboard page. System admins can complete
        admin-specific tasks and abilities from here.
      </MDBTypography>
    </MDBContainer>
  );
};

export default AdminDashboard;