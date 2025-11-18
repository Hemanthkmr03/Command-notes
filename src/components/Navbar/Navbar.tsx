import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';

export default function Navbar() {
  const [value, setValue] = useState<number>(0);
  const theme = useTheme();

  const handleChange = ({ newValue }: any) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: theme.palette.mode === "light" ? "#fafafa" : "#141416ff",
        minHeight: '5vh',
        alignItems: "center",
      }}>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="tabs example"
        sx={{
          display: "flex",
          justifyContent: "center",
          "& .MuiTabs-indicator": {
            backgroundColor: theme.palette.mode === "light" ? "#214966" : "#FFFFFF",
          },
          "& .MuiTab-root": {
            color: theme.palette.text.primary,
            fontWeight: "600",
            "&.Mui-selected": {
              color: theme.palette.mode === "light" ? "#214966" : "#FFFFFF",
            }
          },
        }}
      >
        <Tab className='tabs' label="Commands" component={Link} to='/' />
        <Tab className='tabs' label="Notes" component={Link} to='/notes' />
      </Tabs>
    </Box >
  );
}