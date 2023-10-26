import { useNavigate } from 'react-router-dom';
import React from "react";
import Tooltip from '@mui/material/Tooltip';
import { MDBBtn, MDBCardText, MDBCol, MDBInput, MDBRow, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane, MDBTextArea, MDBTooltip } from "mdb-react-ui-kit";
import Modal from "@mui/material/Modal";
import { Add, Save, Cancel, Check, Block, Remove, Download, Refresh } from "@mui/icons-material"
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Box, IconButton, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = Date.now();
        setRows((oldRows) => [...oldRows, { id }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit },
        }));
    };

    return (
        <GridToolbarContainer>
            <IconButton onClick={handleClick} color="primary">
                <Add />
            </IconButton>
        </GridToolbarContainer>
    );
}

function Journal() {
    const [justifyActive, setJustifyActive] = React.useState('tab1');
    const id = Date.now();
    const [rows, setRows] = React.useState([]);  // Placeholder state for rows
    const [rowModesModel, setRowModesModel] = React.useState({});  // Placeholder state for row modes
    //const [columns] = React.useState([]);  // Placeholder state for columns

    const handleJustifyClick = (tab) => {
        setJustifyActive(tab);
    };
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const handleRowEditStop = (params, event) => {
        // Placeholder for Row Edit Stop logic
    };
    
    const columns = [
        { field: 'dateCreated', headerName: 'Date Created', width: 150, editable: false },
        { field: 'accountName', headerName: 'Account Name', width: 200, editable: false },
        { field: 'debit', headerName: 'Debit', type: 'number', width: 120, editable: false },
        { field: 'credit', headerName: 'Credit', type: 'number', width: 120, editable: false },
        { field: 'status', headerName: 'Status', width: 120, editable: false },
        { field: 'action', headerName: 'Action', width: 150, editable: false, renderCell: (params) => {
                return (
                    // This is just a placeholder. Adjust for document view, if there is a doc attached.
                    <strong>
                        ACTION
                    </strong>
                );
            }
        }
    ];

      
    return (
        <div>
            <MDBTabs style={{ maxWidth: 600, margin: "auto" }} justify className='d-flex flex-row justify-content-between'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Journal Entries
                    </MDBTabsLink>
                </MDBTabsItem>

                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Adjusting Journal Entries
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane show={justifyActive === 'tab1'}
                    style={{
                        height: "85vh",
                        marginLeft: "auto",
                        marginRight: "auto",
                        minWidth: 1000,
                        maxWidth: 1900,
                        paddingLeft: 25,
                        paddingRight: 25,
                        paddingTop: 10
                    }}>
                    <div style={{ display: "flex", height: "100%" }}>
                        <div style={{ flexGrow: 1 }}>
                            {/* Your table/data grid code will go here. It's advisable to replace any database related code or specifics with placeholders or generic names. */}
                            <DataGrid
                            rows={rows}
                            columns={columns}
                            editMode="row"
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={handleRowModesModelChange}
                            onRowEditStop={handleRowEditStop}
                            slots={{
                            toolbar: EditToolbar,
                            }}
                            slotProps={{
                            toolbar: { setRows, setRowModesModel },
                            }}
                        />
                        </div>
                    </div>
                </MDBTabsPane>
            </MDBTabsContent>

            <MDBTabsContent>
                <MDBTabsPane show={justifyActive === 'tab2'} >
                    {/*For the "AdjustingJournal" tab will go here.*/}
                    <h4>Sprint 4 placeholder</h4>
                </MDBTabsPane>
            </MDBTabsContent>
        </div>
    );
}

export default Journal;
