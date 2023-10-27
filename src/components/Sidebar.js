import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useTheme } from '@mui/material/styles';

export default function Sidebar({ open, handleDrawerClose, isAdmin, isManager }) {
    const theme = useTheme();
    const navigate = useNavigate();

    const manageUserItems = [
        { text: 'Edit User', icon: <EditIcon />, path: "/edituser" },
        { text: 'Create User', icon: <AddBoxIcon />, path: "/createuser" },
        { text: 'All Users', icon: <PeopleAltIcon />, path: "/allusers" },
        { text: 'Expired Password', icon: <KeyOffIcon />, path: "/expiredpasswords" }
    ];

    const manageAccountItems = [
        { text: 'Add New Account', icon: <AccountBalanceIcon />, path: "/addaccount" },
        { text: 'Edit Existing Account', icon: <EditNoteIcon />, path: "/editexistingaccounts" },
        { text: 'Account Event Log', icon: <ReceiptLongIcon />, path: "/accounteventlog" }
    ];

    const everyoneItems = [
        { text: 'All Accounts', icon: <AccountBalanceIcon />, path: "/allaccounts" },
        //{ text: 'Account Event Log', icon: <ReceiptLongIcon />, path: '/accounteventlog' },
        { text: 'Journal', icon: <AccountBalanceIcon />, path: "/journal" },
        
    ];

    return (
        <>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>

            <Divider/> Home
            {everyoneItems.map((item) => (
                <ListItem button key={item.text} onClick={() => { navigate(item.path); handleDrawerClose(); }}>
                    <ListItemButton>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            ))}

            {(isManager || isAdmin) && (
                <>
                    <Divider /> Manage Accounts
                    <List>
                        {manageAccountItems.map((item) => (
                            <ListItem button key={item.text} onClick={() => { navigate(item.path); handleDrawerClose(); }}>
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

            {isAdmin && (
                <>
                    <Divider className="mx-2" /> Manage Users
                    <List>
                        {manageUserItems.map((item) => (
                            <ListItem button key={item.text} onClick={() => { navigate(item.path); handleDrawerClose(); }}>
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
            
        </>
    );
}
