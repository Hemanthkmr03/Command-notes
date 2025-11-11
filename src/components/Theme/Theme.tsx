import './Theme.scss';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeContext } from '../../context/ThemeContext';

const Theme = () => {
    const { mode } = useThemeContext();
    return (
        <>
            {mode === "light" ? (
                <DarkModeIcon sx={{ cursor: 'pointer', color: '#214966' }} />
            ) : (
                <LightModeIcon sx={{ cursor: 'pointer', color: '#fff' }} />
            )}
        </>
    )
}

export default Theme