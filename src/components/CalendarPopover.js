import React, { useState } from 'react';
import Calendar from "react-calendar";
import Popover from '@mui/material/Popover';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import 'react-calendar/dist/Calendar.css';

export default function CalendarPopover() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // function getDate() {
    //   const today = new Date();
    //   const month = today.getMonth() + 1;
    //   const year = today.getFullYear();
    //   const date = today.getDate();
    //   return `${year}/${month}/${date}`;
    // }

    return (
        <div>
            <Tooltip title="View Calendar">
                <IconButton aria-describedby={id} onClick={handleClick} style={{ color: 'white' }}>
                    <CalendarIcon />
                </IconButton>

            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div style={{ padding: '10px' }}>
                    <h6>Today's Date</h6>
                    <p>{new Date().toLocaleDateString()}</p>
                    <Calendar />
                </div>
            </Popover>
        </div>
    );
}
