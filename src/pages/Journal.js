import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Add, Check, Block, RemoveRedEye } from "@mui/icons-material";
import { getJournalEntry, setJournalStatus, addJournalEntry, deleteJournalEntry, GetAllAccounts } from '../MongoDbClient';

function AddJournalEntryModal({ open, onClose, onSave }) {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState("");

    useEffect(() => {
        const fetchAccounts = async () => {
            const fetchedAccounts = await GetAllAccounts();
            setAccounts(fetchedAccounts);
        };
        fetchAccounts();
    }, []);

    const date = new Date();

    const [newEntry, setNewEntry] = useState({
        journalID: '',
        accountName: '',
        journalNumber: '',
        debit: '',
        credit: '',
        dateCreated: date.toISOString().slice(0, 10),
        status: 'Pending',
    });

    const handleSave = () => {
        onSave({ ...newEntry, account: selectedAccount });
        onClose();
    };

    function handleSelectChange(event) {
        const accountId = event.target.value;
        const accountName = accounts.find(acc => acc._id === accountId)?.accName || '';

        setSelectedAccount(accountId);
        setNewEntry({ ...newEntry, accountName: accountName });
    }



    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Journal Entry</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense" variant="standard">
                    <InputLabel>Account</InputLabel>
                    <Select
                        value={selectedAccount}
                        label="Account"
                        onChange={handleSelectChange}
                    >
                        {Object.values(accounts).filter(acc => acc.accName).map((account) => (
                            <MenuItem key={account._id} value={account._id}>
                                {account.accName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Journal ID"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setNewEntry({ ...newEntry, journalID: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Journal Number"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setNewEntry({ ...newEntry, journalNumber: e.target.value })}
                />
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
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            const entries = await getJournalEntry();
            const adjustedEntries = entries.map(entry => ({
                id: entry._id.toString(),
                accountName: entry.accountName,
                journalID: entry.journalID,
                journalNumber: parseInt(entry.journalNumber),
                dateCreated: entry.datecreated,
                debit: parseInt(entry.debits),
                credit: parseInt(entry.credits),
                status: entry.status,
                action: entry.action
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
        const res = await setJournalStatus(id, 'Rejected');
        window.alert(JSON.stringify(res));

        // Update local state to reflect the change
        setRows(rows.map(row => row.id === id ? { ...row, status: 'Rejected' } : row));
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
        { field: 'id', headerName: 'Database ID', width: 150 },
        { field: 'accountName', headerName: 'Account Name', width: 200 },
        { field: 'journalID', headerName: 'Journal ID', width: 150 },
        { field: 'journalNumber', headerName: 'Journal Number', width: 150 },
        { field: 'debit', headerName: 'Debit', type: 'number', width: 120 },
        { field: 'credit', headerName: 'Credit', type: 'number', width: 120 },
        { field: 'status', headerName: 'Status', width: 120 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleApprove(params.row.id)} color="primary">
                        <Check />
                    </IconButton>
                    <IconButton onClick={() => handleReject(params.row.id)} color="secondary">
                        <Block />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <Block />
                    </IconButton>
                    <IconButton onClick={() => goToLedger(params.row.accountName)}>
                        <RemoveRedEye />
                    </IconButton>
                </>
            ),
        }
    ];

    const filteredRows = rows.filter((row) => {
        return (
            (filterStatus === "All" || row.status === filterStatus) &&
            ((row.accountName && row.accountName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (row.debit !== null && row.debit !== undefined && row.debit.toString().includes(searchTerm)) ||
                (row.credit !== null && row.credit !== undefined && row.credit.toString().includes(searchTerm)) ||
                (row.dateCreated && row.dateCreated.includes(searchTerm)))
        );
    });

    // Function to open the Add Journal Entry Modal
    const handleAddNewClick = () => {
        setModalOpen(true);
    };

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Status Filter</InputLabel>
                    <Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        label="Status Filter"
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Approved">Approved</MenuItem>
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
                    Toolbar: EditToolbar,
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
                checkboxSelection
                disableSelectionOnClick
            />
            <AddJournalEntryModal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={async (newEntry) => {
                    console.log(newEntry)
                    const response = await addJournalEntry(newEntry);
                    if (response.entry) {
                        setRows([...rows, { ...response.entry, id: response.entry._id.toString() }]);
                    } else {
                        console.error(response.message);
                    }
                }}

            />
        </Box>
    );
}

export default Journal;
