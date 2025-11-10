import './Theme.scss';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeContext } from '../../context/ThemeContext';

const Theme = () => {
    // const [theme, setTheme] = useState();
    const { mode, toggleTheme } = useThemeContext();
    return (
        <div className='theme' onClick={toggleTheme}>
            {mode === "light" ? (
                <DarkModeIcon sx={{ cursor: 'pointer', color: '#333' }} />
            ) : (
                <LightModeIcon sx={{ cursor: 'pointer', color: 'yellow' }} />
            )}
        </div>
    )
}

export default Theme