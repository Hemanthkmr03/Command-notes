import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import './SnackBar.scss'
import { Alert } from '@mui/material';


interface SnackBarProps {
    open: boolean;
    message: string;
    severity?: 'success' | "error" | "warning" | "info";
    duration?: number;
    onClose: () => void;
}

export default function SnackBar({
    open,
    message,
    severity = "info",
    duration = 1500,
    onClose,
}: SnackBarProps) {

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={duration}
                onClose={onClose}
                message={message}
            // severity={severity}
            >
                <Alert severity={severity}>{message}</Alert>
            </Snackbar>
        </div>
    );
}