import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import AddCommandDialog from '../AddCommandDialog/AddCommandDialog';
import Theme from '../Theme/Theme';
import { useThemeContext } from '../../context/ThemeContext';


export default function ExpandableActionButton() {
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
    const { toggleTheme } = useThemeContext();

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
                    ariaLabel="SpeedDial Actions"
                    icon={<ArrowCircleLeftIcon />}
                    direction="left"
                    sx={{ position: 'fixed', bottom: 20, right: 20, }}

                >
                    {/* {actions.map((action) => (
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
                    ))} */}

                    <SpeedDialAction
                        key="Add"
                        icon={<AddIcon />}
                        onClick={() => setOpenAddDialog(true)}
                        tooltipTitle="Add"

                    />
                    <SpeedDialAction
                        key="Edit"
                        icon={<EditIcon />}
                        onClick={() => console.log("Edit clicked")}
                    />
                    <SpeedDialAction
                        key='Theme'
                        icon={<Theme />}
                        onClick={toggleTheme}
                        tooltipTitle="Toggle Theme"
                    />
                </SpeedDial>
            </Box>
        </Box>
    );
}