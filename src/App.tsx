import { Route, Routes } from 'react-router-dom'
import './App.css'
import CommandsPage from './pages/CommandsPage/CommandsPage'
import NotesPage from './pages/NotesPage/NotesPage'
import Navbar from './components/Navbar/Navbar'
import { Box, useTheme } from '@mui/material'
import { useState } from 'react'
import { useSnackbar } from './context/SnackbarContext'
import SnackBar from './components/SnackBar/SnackBar'

function App() {
  const theme = useTheme();
  const [showEditMode, setShowEditMode] = useState<any>(false);
  const { snackbar, closeSnackbar } = useSnackbar();

  return (
    <Box className='app'
      sx={{
        background: theme.palette.background.default
      }}>
      <Navbar />
      <Routes>
        <Route path='/' element={<CommandsPage showEditMode={showEditMode} setShowEditMode={setShowEditMode} />} />
        <Route path='/notes' element={<NotesPage />} />
        <Route path='*' element={<CommandsPage showEditMode={showEditMode} setShowEditMode={setShowEditMode} />} />
      </Routes>
      <SnackBar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        duration={snackbar.duration}
        onClose={closeSnackbar}
      />
    </Box>
  )
}

export default App
