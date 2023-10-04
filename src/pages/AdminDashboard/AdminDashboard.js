import React from "react";

import {MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import AddNewAccount from './AddNewAccount.js';
import EditExistingAccount from './EditExistingAccounts.js';
import ExpiredPasswords from './ExpiredPasswords.js';
import AllUsers from './AllUsers.js';
import EditUser from './EditUser.js';
import CreateUserPage from "./CreateUserPage";
import AllAccounts from './AllAccounts.js';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// Mui Elements
import { styled, useTheme } from '@mui/material/styles';
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



const AdminDashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

   // Drawer
   const handleDrawerOpen = () => { setOpen(true); };
   const handleDrawerClose = () => { setOpen(false); };

   const userItems = [
    { text: 'Edit User', icon: <EditIcon /> },
    { text: 'Create User', icon: <AddBoxIcon /> },
    { text: 'All Users', icon: <PeopleAltIcon /> },
    { text: 'Expired Password', icon: <KeyOffIcon /> }
  ];
  
  const accountItems = [
    { text: 'Add New Account', icon: <AccountBalanceIcon /> },
    { text: 'Edit Existing Account', icon: <EditNoteIcon /> }
  ];;

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

      <IconButton
        color="inherit"
        className="p-3 mx-3"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerOpen}
        sx={{ mr: 2 }}
      >
        <MenuIcon />  <h5 className="mt-2 mx-3">MENU</h5>
      </IconButton>

       {/* The Drawer */}
       <Drawer variant="persistent" anchor="left" open={open}>
       <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>

        <Divider className="mx-2"/> Users
        <List>
          {userItems.map((item, index) => (
            <ListItem button key={item.text} onClick={() => { setActiveTab(index); handleDrawerClose(); }}>
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider /> Accounts
        <List>
          {accountItems.map((item, index) => (
            <ListItem button key={item.text} onClick={() => { setActiveTab(index + userItems.length); handleDrawerClose(); }}>
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
              
      <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        <TabList style={{ display: 'none' }}>
          <Tab>Edit User</Tab>
          <Tab>Create User</Tab>
          <Tab>All Users</Tab>
          <Tab>Expired Passwords</Tab>
          <Tab>Add New Account</Tab>
          <Tab>Edit Existing Account</Tab>
          <Tab>All Accounts</Tab>
        </TabList>

        <TabPanel> <EditUser/> </TabPanel>
        <TabPanel> <CreateUserPage/> </TabPanel>
        <TabPanel> <AllUsers/> </TabPanel>
        <TabPanel> <ExpiredPasswords/> </TabPanel>
        <TabPanel> <AddNewAccount /> </TabPanel>
        <TabPanel> <EditExistingAccount /> </TabPanel>
        <TabPanel> <AllAccounts/> </TabPanel>
      </Tabs>
    </MDBContainer>
  );
};

export default AdminDashboard;