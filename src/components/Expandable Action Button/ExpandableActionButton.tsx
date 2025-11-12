import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Theme from '../Theme/Theme';
import { useThemeContext } from '../../context/ThemeContext';


interface ExpandableActionButtonProps {
    showEditMode: boolean;
    setShowEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenAddDialog: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function ExpandableActionButton({ showEditMode, setShowEditMode, setOpenAddDialog }: ExpandableActionButtonProps) {
    const { toggleTheme } = useThemeContext();

    const handleEditToggle = () => {
        setShowEditMode((prev) => !prev);
    }

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
                <SpeedDial
                    ariaLabel="SpeedDial Actions"
                    icon={<ArrowCircleLeftIcon />}
                    direction="left"
                    sx={{ position: 'fixed', bottom: 20, right: 20, }}

                >
                    <SpeedDialAction
                        key="Add"
                        icon={<AddIcon />}
                        onClick={() => setOpenAddDialog(true)}
                        tooltipTitle="Add"

                    />
                    <SpeedDialAction
                        key="Edit"
                        icon={<EditIcon />}
                        onClick={handleEditToggle}
                        tooltipTitle={showEditMode ? "Exit Edit Mode" : "Edit Mode"}
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