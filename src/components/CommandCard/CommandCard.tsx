import './CommandCard.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import React from 'react';
import { useTheme } from '@emotion/react';
import { FaRegCopy } from "react-icons/fa";
import { useSnackbar } from '../../context/SnackbarContext';

interface Command {
    id: string;
    name: string;
}

interface CommandCardProps {
    commandsList: Command[];
    showEditMode: boolean
    onDelete: (id: string) => void;
    onEdit: (id: string, currentName: string) => void;
}

const CommandCard: React.FC<CommandCardProps> = ({ commandsList, showEditMode, onDelete, onEdit }) => {
    const { showSnackbar } = useSnackbar();
    const theme: any = useTheme();
    const isDark = theme.palette.mode === "dark";

    const handleCopy = (command: string) => {
        navigator.clipboard.writeText(command)
            .then(() => showSnackbar("Coppied!", "info"))
            .catch(() => showSnackbar("Copy failed", "info"));
    };


    return (
        <ul className='command-card'>
            {commandsList.map((item: Command) => (
                <li
                    style={{
                        background: isDark ? "#161616" : "#FFFFFF",
                        borderLeft: isDark ? "4px solid #FFFFFF" : "4px solid #214966",
                    }} className='command-card-cmd ' key={item.id}>
                    <div className='left'>
                        <p className='command-cmd'
                            style={{ color: isDark ? "#FFFFFF" : "#214966" }}
                        >
                            {item.name}
                        </p>
                    </div>
                    <div className="right" >
                        {showEditMode ? (
                            <>
                                <EditIcon
                                    onClick={() => onEdit(item.id, item.name)}
                                    sx={{
                                        cursor: "pointer",
                                        color: isDark ? "#FFF" : "#214966",
                                    }} />
                                <DeleteIcon
                                    onClick={() => onDelete(item.id)}
                                    sx={{
                                        cursor: "pointer",
                                        color: isDark ? "#FFF" : "#214966",
                                    }} />
                            </>
                        ) : (
                            <Button
                                sx={{
                                    color: isDark ? "white" : "black",
                                    margin: '0',
                                    padding: '0'
                                }}
                                onClick={
                                    () => handleCopy(item.name)}>{<FaRegCopy size={18} />}</Button>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default CommandCard