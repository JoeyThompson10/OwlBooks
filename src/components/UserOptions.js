import React from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

export default function UserOptions({ logOut, navigateToDashboard }) {
    return (
        <Tooltip title="User Options">
            <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" style={{ color: 'white' }}>
                    <IconButton>
                        <AccountCircleIcon style={{ color: 'white' }} />
                    </IconButton>
                </MDBDropdownToggle>
                <MDBDropdownMenu dark>
                    <MDBDropdownItem href="#" onClick={navigateToDashboard}>Dashboard</MDBDropdownItem>
                    <MDBDropdownItem href="#" onClick={logOut}>Logout</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        </Tooltip>
    );
}
