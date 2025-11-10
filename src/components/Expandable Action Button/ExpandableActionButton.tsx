import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import AddCommandDialog from '../AddCommandDialog/AddCommandDialog';


interface Action {
    icon: React.ReactNode;
    name: string
}

const actions: Action[] = [
    { icon: <AddIcon />, name: 'Add' },
];

export default function ExpandableActionButton() {
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);

    return (
        <Box sx={{
            transform: 'translateZ(0px)',
            flexGrow: 1,
            minHeight: '90vh',
            position: 'fixed',
            bottom: '0',
            right: '0'
        }}>

            <Box sx={{
                transform: 'translateZ(0px)',
                flexGrow: 1,
                minHeight: '100vh'
            }}>
                <AddCommandDialog
                    openAddDialog={openAddDialog}
                    setOpenAddDialog={setOpenAddDialog}
                />
                <SpeedDial
                    ariaLabel="SpeedDial playground example"
                    icon={<ArrowCircleLeftIcon />}
                    direction="left"
                    sx={{ position: 'fixed', bottom: 20, right: 20, }}

                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            onClick={() => setOpenAddDialog(true)}
                            slotProps={{
                                tooltip: {
                                    title: action.name,
                                },
                            }}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </Box>
    );
}