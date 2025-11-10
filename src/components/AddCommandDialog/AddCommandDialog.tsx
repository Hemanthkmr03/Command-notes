import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { DATA_ENDPOINT } from '../../constant.js';



export default function AddCommandDialog({ openAddDialog, setOpenAddDialog }) {
    // const [open, setOpen] = useState<boolean>(false);
    const [command, setCommand] = useState('');

    const handleClickOpen = () => {
        setOpenAddDialog(true);
    };

    const handleClose = () => {
        setOpenAddDialog(false);
    };

    const handleAdd = async (a) => {
        if (!command.trim()) return alert("Please enter a command");

        try {
            await fetch(DATA_ENDPOINT, {
                method: "POST",
                headers: { "Content-type": 'application/json' },
                body: JSON.stringify({ name: command }),
            });

            alert("command added successfully!");
            setCommand("");
            handleClose();

        } catch (error) {
            console.log("Error adding command:", error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const email = formJson.email;
        console.log(email);
        handleClose();
    };

    return (
        <>
            <Dialog
                open={openAddDialog}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: '500px',      // fixed width
                        maxWidth: '90vw',    // prevents overflow on small screens
                        borderRadius: 2,     // optional
                        p: 2,                // optional padding
                    },
                }}
            >
                <DialogTitle>Add Command</DialogTitle>
                <DialogContent>
                    <form id="subscription-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="text"
                            label="Add your command here"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setCommand(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd} variant='contained'>
                        Add
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    );
}