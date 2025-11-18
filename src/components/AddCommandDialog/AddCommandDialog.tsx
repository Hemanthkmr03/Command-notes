import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DATA_ENDPOINT } from '../../constant.ts';
import { useTheme } from '@emotion/react';
import { useSnackbar } from '../../context/SnackbarContext.js';
import './AddCommandDialog.scss'



export default function AddCommandDialog({ openAddDialog, setOpenAddDialog, refreshData, editingCommand, setEditingCommand }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const [command, setCommand] = useState('');
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (editingCommand) {
            setCommand(editingCommand.name);
        } else {
            setCommand("")
        }
    }, [editingCommand]);

    const handleClose = () => {
        setOpenAddDialog(false);
        setEditingCommand(null);
        setCommand("");
    };

    const handleSubmit = async () => {
        if (!command.trim()) {
            showSnackbar("Please enter a command", "warning");
            return;
        }

        try {
            let res
            if (editingCommand) {

                res = await fetch(`${DATA_ENDPOINT}/${editingCommand.id}.json`, {
                    method: "PUT",
                    headers: { "Content-type": 'application/json' },
                    body: JSON.stringify({ name: command }),
                });
                if (!res.ok) throw new Error("Failed to update command")
                showSnackbar("command updated successfully!", "success")

            } else {

                const res = await fetch(`${DATA_ENDPOINT}.json`, {
                    method: "POST",
                    headers: { "Content-type": 'application/json' },
                    body: JSON.stringify({ name: command }),
                });
                if (!res.ok) throw new Error("Failed to add command")
                showSnackbar("command added successfully!", "success")

            }

            setCommand("");
            handleClose();
            refreshData();

        } catch (error) {
            console.log("Error adding command:", error);
            showSnackbar("Something went wrong.", "error")
        }
    }


    return (
        <>
            <Dialog
                open={openAddDialog}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: '500px',
                        maxWidth: '90vw',
                        borderRadius: 2,
                        p: 2,
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: "700" }}>Add Command</DialogTitle>
                <DialogContent>
                    <form id="subscription-form">
                        <TextField
                            className='cmd-input'
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="text"
                            label={editingCommand ? "Edit your command" : "Add your command here"}
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={command}
                            multiline
                            rows={5}
                            onChange={(e) => setCommand(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{
                            padding: "5px 50px",
                            color: isDark ? "#fff" : "#214966", fontWeight: '600',
                        }}
                        onClick={handleClose}>Cancel</Button>
                    <Button
                        sx={{
                            padding: "5px 50px",
                            background: isDark ? "#FFFFFF" : "#214966", fontWeight: '600',
                        }}
                        onClick={handleSubmit}
                        variant='contained'>
                        {editingCommand ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    );
}