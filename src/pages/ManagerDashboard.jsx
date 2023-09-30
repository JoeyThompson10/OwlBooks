import React from "react";
//import { useNavigate } from 'react-router-dom';
import {MDBCard, MDBContainer, MDBTable, MDBTableHead, MDBTableBody} from "mdb-react-ui-kit";

const ManagerDashboard = () => {
    //const navigate = useNavigate();

    return (
        <MDBContainer fluid className="p-0 bg-light bg-gradient text-dark">
        <MDBCard  alignment='right'>

            <h1 className="display-1 mx-3">Manager Dashboard</h1>
            <h4 className="display-7 mx-3">This is the manager dashboard page. Managers can complete manager specific tasks and view accounts .</h4><br />
        <h6>This is a Place Holder Example</h6>
        </MDBCard>

        <MDBTable>
        <MDBTableHead className="bg-info text-light ">
        <tr>
            <th scope='col'>#</th>
            <th scope='col'>First Name</th>
            <th scope='col'>Last Name</th>
            <th scope='col'>Access Level</th>
        </tr>
        </MDBTableHead>
        <MDBTableBody>
        <tr><th scope='row'>1</th>
            <td>Michael</td>
            <td>Jackson</td>
            <td>Admin</td>
        </tr>
        <tr><th scope='row'>2</th>
            <td>Serenia</td>
            <td>Pot</td>
            <td>Manager</td>
        </tr>
        <tr><th scope='row'>3</th>
            <td>Colin</td>
            <td>Robinson</td>
            <td>Normal</td>
        </tr>
        <tr><th scope='row'>4</th>
            <td>John</td>
            <td>Doe</td>
            <td>Normal</td>
        </tr>
        <tr><th scope='row'>5</th>
            <td>Robert</td>
            <td>Robert</td>
            <td>Normal</td>
        </tr>
        </MDBTableBody>
        </MDBTable>
    </MDBContainer>
    );
};

export default ManagerDashboard;