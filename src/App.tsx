import { Route, Routes } from 'react-router-dom'
import './App.css'
import CommandsPage from './pages/CommandsPage/CommandsPage'
import NotesPage from './pages/NotesPage/NotesPage'
import Navbar from './components/Navbar/Navbar'
import ExpandableActionButton from './components/Expandable Action Button/ExpandableActionButton'
import Theme from './components/Theme/Theme'
import { Box, useTheme } from '@mui/material'

function App() {
  const theme = useTheme();

  return (
    <Box className='app'
      sx={{
        background: theme.palette.background.default
      }}>
      <Navbar />
      <Theme />
      <Routes>
        <Route path='/' element={<CommandsPage />} />
        <Route path='/notes' element={<NotesPage />} />
        <Route path='*' element={<CommandsPage />} />
      </Routes>
      <ExpandableActionButton />
    </Box>
  )
}

export default App
