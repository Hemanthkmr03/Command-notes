import './CommandCard.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import React from 'react';
import { useTheme } from '@emotion/react';

interface Command {
    id: string;
    name: string;
}

interface CommandCardProps {
    commandsList: Command[];
}



const CommandCard: React.FC<CommandCardProps> = ({ commandsList }) => {

    const theme = useTheme();

    const isDark = theme.palette.mode === "dark";

    const handleDelete = (command: string) => {
        console.log("Delete", command);
    }

    const handleEdit = (command: string) => {
        console.log("Edit", command);
    }

    const handleCopy = (command: string) => {
        navigator.clipboard.writeText(command)
            .then(() => alert("Coppied!"))
            .catch(() => alert("Copy failed"));
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
                        {/* <EditIcon onClick={() => handleEdit(item)} sx={{ cursor: "pointer", color: '#16163F' }} /> */}
                        {/* <DeleteIcon onClick={() => handleDelete(item)} sx={{ cursor: "pointer", color: '#16163F' }} /> */}
                        <Button
                            sx={{ color: "black", margin: '0', padding: '0' }}
                            onClick={
                                () => handleCopy(item.name)}>Copy</Button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default CommandCard