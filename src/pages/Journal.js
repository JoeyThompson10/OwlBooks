import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Add, Check, Block, Delete, RemoveRedEye } from "@mui/icons-material";
import { getJournalEntry, setJournalStatus, addJournalEntry, deleteJournalEntry, GetAllAccounts } from '../MongoDbClient';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box sx={{ p: 3 }}>
                {children}
            </Box>
            )}
        </div>
    );
}
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function AddJournalEntryModal({ open, onClose, onSave, isManager, isAdmin, tabValue }) {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState("");
    const [selectedDebitAccount, setSelectedDebitAccount] = useState("");
    const [selectedCreditAccount, setSelectedCreditAccount] = useState("");



    
    useEffect(() => {
        const fetchAccounts = async () => {
            const fetchedAccounts = await GetAllAccounts();
            setAccounts(fetchedAccounts);
        };

        if (open) {
            setNewEntry({
              ...newEntry,
              typeEntry: tabValue === 1 ? 'Adjusted' : 'Regular'
            });
          }

        fetchAccounts();
    }, [open, tabValue]);

    const date = new Date();

    const [newEntry, setNewEntry] = useState({
        accountName: '',
        debitAccount: '',
        creditAccount: '',
        debit: '',
        credit: '',
        dateCreated: date.toISOString().slice(0, 10),
        typeEntry: '',
        status: 'Pending',
        comment: ''
    });

    const handleSave = () => {
        onSave({ ...newEntry, account: selectedAccount });
        onClose();
    };

    function handleSelectChange(event, type) {
        const accountId = event.target.value;
        const accountName = accounts.find(acc => acc._id === accountId)?.accName || '';
        if (type == 'debit') {
            setSelectedDebitAccount(accountId);
            setNewEntry({ ...newEntry, debitAccount: accountName });
        } else {
            setSelectedCreditAccount(accountId);
            setNewEntry({ ...newEntry, creditAccount: accountName });
        }
    }

// this is the pop-up to add accounts
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Journal Entry</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense" variant="standard">
                    <InputLabel>Debit Account</InputLabel>
                    <Select
                        value={selectedDebitAccount}
                        label="Debit Account"
                        onChange={(e) => handleSelectChange(e, 'debit')}
                    >
                        {Object.values(accounts).filter(acc => acc.accName).map((account) => (
                            <MenuItem key={account._id} value={account._id}>
                                {account.accName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense" variant="standard">
                    <InputLabel>Credit Account</InputLabel>
                    <Select
                        value={selectedCreditAccount}
                        label="Credit Account"
                        onChange={(e) => handleSelectChange(e, 'credit')}
                    >
                        {Object.values(accounts).filter(acc => acc.accName).map((account) => (
                            <MenuItem key={account._id} value={account._id}>
                                {account.accName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
               
                <TextField
                    margin="dense"
                    label="Debit"
                    fullWidth
                    variant="standard"
                    type="number"
                    onChange={(e) => setNewEntry({ ...newEntry, debit: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Credit"
                    fullWidth
                    variant="standard"
                    type="number"
                    onChange={(e) => setNewEntry({ ...newEntry, credit: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Date Created"
                    fullWidth
                    variant="standard"
                    type="date"
                    defaultValue={date.toISOString().slice(0, 10)}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setNewEntry({ ...newEntry, dateCreated: e.target.value })}
                />
                <FormControl fullWidth margin="dense" variant="standard">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={newEntry.status}
                        label="Status"
                        onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value })}
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Approved">Approved</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}


function EditToolbar(props) {
    const { onAddNew } = props;

    return (
        <Box>
            <IconButton color="primary" aria-label="add new journal entry" component="span" onClick={onAddNew}>
                <Add />
            </IconButton>
        </Box>
    );
}

function Journal() {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem("privilages") === "admin";
    const isManager = localStorage.getItem("privilages") === "manager";
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [tabValue, setTabValue] = useState(0);
    const [newEntry, setNewEntry] = useState({});
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectComment, setRejectComment] = useState('');
    const [rejectingRowId, setRejectingRowId] = useState(null);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setNewEntry({ ...newEntry, typeEntry: newValue === 1 ? 'Adjusted' : 'Regular' });
    };
    const handleAddNewClick = () => {
        setNewEntry(currentNewEntry => ({
            ...currentNewEntry,
            typeEntry: tabValue === 0 ? 'Regular' : 'Adjusted',
            
        }));
        setModalOpen(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            const entries = await getJournalEntry();
            const adjustedEntries = entries.map(entry => ({
                id: entry._id.toString(),
                typeEntry: entry.typeEntry,
                debitAccount: entry.debitAccount,
                creditAccount: entry.creditAccount,
                dateCreated: entry.datecreated,
                debit: parseInt(entry.debits),
                credit: parseInt(entry.credits),
                status: entry.status,
                action: entry.action,
                comment: entry.comment
            }));
            setRows(adjustedEntries);
        };

        fetchData();
    }, []);

    const handleApprove = async (id) => {
        const res = await setJournalStatus(id, 'Approved');
        window.alert(JSON.stringify(res));
        // Update local state to reflect the change
        setRows(rows.map(row => row.id === id ? { ...row, status: 'Approved' } : row));
    };

    const handleReject = async (id) => {
        setIsRejectModalOpen(true);
        setRejectingRowId(id);
    };

    const submitRejection = async () => {
        if (rejectComment.trim()) {
            // Now you call the function to reject the entry with the comment
            const res = await setJournalStatus(rejectingRowId, 'Rejected', rejectComment);
            window.alert(JSON.stringify(res));
    
            // Update local state to reflect the change only after the comment has been submitted
            setRows(rows.map(row => row.id === rejectingRowId ? { ...row, status: 'Rejected', comment: rejectComment } : row));
    
            // Reset the comment and close the rejection dialog
            setRejectComment('');
            setIsRejectModalOpen(false);
        } else {
            window.alert("Comment is required to reject an entry.");
        }
    };
    

    const handleDelete = async (id) => {
        const res = await deleteJournalEntry(id);
        window.alert(JSON.stringify(res));

        // Update local state to reflect the change
        setRows(rows.filter(row => row.id !== id));
    }

    const goToLedger = (accountName) => {
        navigate(`/ledger/${accountName}`);
    };

    const columns = [
        { field: 'dateCreated', headerName: 'Date Created', width: 150 },
        //{ field: 'id', headerName: 'Database ID', width: 150 },
        //{ field: 'journalID', headerName: 'Journal ID', width: 150 },
       // { field: 'journalNumber', headerName: 'Journal Number', width: 150 },
        { field: 'debitAccount', headerName: 'Account Debited', width: 180,  renderCell: (params) => (
            <a onClick={() => goToLedger(params.value)} style={{cursor: 'pointer'}}>
                {params.value}
            </a>
        )},
        { field: 'debit', headerName: 'Debit', type: 'number', width: 120 },
        { field: 'creditAccount', headerName: 'Account Credited', width: 180, renderCell: (params) => (
            <a onClick={() => goToLedger(params.value)} style={{cursor: 'pointer'}}>
                {params.value}
            </a> )},
        { field: 'credit', headerName: 'Credit', type: 'number', width: 120 },
        { field: 'typeEntry', headerName: 'Entry Type', width: 150 },
        { field: 'status', headerName: 'Status', width: 120 },
        { field: 'comment', headerName: 'Comments', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            width: 165,
            renderCell: (params) => (
                <>
                {(isManager || isAdmin ) && (
                <>
                    <IconButton onClick={() => handleApprove(params.row.id)} color="primary">
                        <Check />
                    </IconButton>
                    <IconButton onClick={() => handleReject(params.row.id)} color="secondary">
                        <Block />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <Delete />
                    </IconButton>
                </>
                )}
                    <IconButton onClick={() => goToLedger(params.row.accountName)}>
                        <RemoveRedEye />
                    </IconButton>
                </>
                
            ),
        }
    ];

    const filteredRows = rows.filter((row) => {
        const searchTermLower = searchTerm.toLowerCase();
        const isCorrectType = (tabValue === 0 && row.typeEntry === 'Regular') || (tabValue === 1 && row.typeEntry === 'Adjusted');
        return (
            isCorrectType &&
            (filterStatus === "All" || row.status === filterStatus) &&
            ((row.accountName && row.accountName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (row.debit !== null && row.debit !== undefined && row.debit.toString().includes(searchTerm)) ||
            (row.credit !== null && row.credit !== undefined && row.credit.toString().includes(searchTerm)) ||
            (row.dateCreated && row.dateCreated.includes(searchTerm)))
        );
      });
      

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} centered aria-label="journal tabs" >
                    <Tab label="Journal Entries" {...a11yProps(0)} />
                    <Tab label="Adjusted Journal Entries" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={tabValue} index={0}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                {/* <TextField
                    label="Search"
                    variant="outlined"
                    onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Status Filter</InputLabel>
                    <Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        label="Status Filter"
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Approved" >Approved</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Dialog open={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)}>
                <DialogTitle>Reject Journal Entry</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Rejection Comment"
                        fullWidth
                        variant="standard"
                        value={rejectComment}
                        onChange={(e) => setRejectComment(e.target.value)}
                        required
                    />
                </DialogContent>

                {/* call the backend function to process rejection */}
                <DialogActions>
                    {/* <Button onClick={() => setIsRejectModalOpen(false)}>Cancel</Button> */}
                    <Button onClick={() => { setIsRejectModalOpen(false); 
                        setRejectComment('');
                        }}>Cancel</Button>
                    <Button onClick={submitRejection} color="secondary">
                        Submit Rejection
                    </Button>
                </DialogActions>
            </Dialog>

            <DataGrid
                rows={filteredRows}
                columns={columns}
                rowModesModel={rowModesModel}
                onRowModesModelChange={setRowModesModel}
                components={{
                    Toolbar: GridToolbar, // Added GridToolbar here
                }}
                componentsProps={{
                    toolbar: {
                        onAddNew: handleAddNewClick, // Passing the function to open the modal
                        setRows,
                        setRowModesModel
                    },
                }}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
            <AddJournalEntryModal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                tabValue={tabValue}
                onSave={async (entry) => {
                    console.log(entry);
                    const response = await addJournalEntry(entry);
                    if (response.entry) {
                        setRows([...rows, { ...response.entry, id: response.entry._id.toString() }]);
                    } else {
                        console.error(response.message);
                    }
                }}
                newEntry={newEntry}
                setNewEntry={setNewEntry}
            />
            </CustomTabPanel>

            <CustomTabPanel value={tabValue} index={1}>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                {/* <TextField
                    label="Search"
                    variant="outlined"
                    onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Status Filter</InputLabel>
                    <Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        label="Status Filter"
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Approved" >Approved</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={setRowModesModel}
                    components={{
                        Toolbar: GridToolbar, // Added GridToolbar here
                    }}
                    componentsProps={{
                        toolbar: {
                            onAddNew: handleAddNewClick, // Passing the function to open the modal
                            setRows,
                            setRowModesModel
                        },
                    }}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
                <AddJournalEntryModal
                    open={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    tabValue={tabValue}
                    onSave={async (entry) => {
                        console.log(entry);
                        const response = await addJournalEntry(entry);
                        if (response.entry) {
                            setRows([...rows, { ...response.entry, id: response.entry._id.toString() }]);
                        } else {
                            console.error(response.message);
                        }
                    }}
                    newEntry={newEntry}
                    setNewEntry={setNewEntry}

                />
            </CustomTabPanel>
        </Box>
        
    );
}

export default Journal;
