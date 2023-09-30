import React from "react";

import {
  MDBContainer,
  MDBTypography
} from "mdb-react-ui-kit";
import AddNewAccount from './AddNewAccount.js';
import EditExistingAccount from './EditExistingAccounts.js';
import ExpiredPasswords from './ExpiredPasswords.js';
import AllUsers from './AllUsers.js';
import EditUser from './EditUser.js';
import CreateUserPage from "./CreateUserPage";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const AdminDashboard = () => {
  return (
    <MDBContainer fluid className="p-0 bg-warning text-dark">
      <h1>
        <MDBTypography tag="div" className="display-1 mb-3 mx-4 text-light">
          Admin Dashboard
        </MDBTypography>
      </h1>
      <MDBTypography className="lead mb-3 mx-4">
        This is the admin dashboard page. System admins can complete
        admin-specific tasks and abilities from here.
      </MDBTypography>

      <Tabs>
        <TabList>
          <Tab>Edit User</Tab>
          <Tab>Create User</Tab>
          <Tab>All Users</Tab>
          <Tab>Expired Passwords</Tab>
          <Tab>Add New Account</Tab>
          <Tab>Edit Existing Account</Tab>
          <Tab>All Accounts</Tab>
        </TabList>

        <TabPanel>
          <EditUser />
        </TabPanel>

        <TabPanel>
          <CreateUserPage />
        </TabPanel>

        <TabPanel>
          <AllUsers />
        </TabPanel>

        <TabPanel>
          <ExpiredPasswords />
        </TabPanel>

        <TabPanel>
          <AddNewAccount />
        </TabPanel>

        <TabPanel>
          <EditExistingAccount />
        </TabPanel>
      </Tabs>
    </MDBContainer>
  );
};

export default AdminDashboard;