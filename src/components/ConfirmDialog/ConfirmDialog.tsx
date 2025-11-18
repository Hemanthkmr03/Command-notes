import { forwardRef, useRef } from 'react';
import { Dialog, DialogActions, DialogTitle, Button, Paper } from "@mui/material";
import Draggable from "react-draggable";
import type { PaperProps } from "@mui/material";
import './ConfirmDialog.scss'


interface ConfirmDialogProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const PaperComponent = forwardRef<HTMLDivElement, PaperProps>((props, ref) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
            nodeRef={nodeRef}
        >
            <Paper {...props} ref={nodeRef} />
        </Draggable>
    );
});

export default function ConfirmDialog({
    open,
    onConfirm,
    onCancel
}: ConfirmDialogProps) {

    return (
        <>
            <Dialog
                open={open}
                onClose={onCancel}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Are you sure you want to delete this?
                </DialogTitle>
                <DialogActions>
                    <Button autoFocus onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button onClick={onConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
