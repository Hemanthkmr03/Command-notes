import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState, type SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';

export default function Navbar() {
  const [value, setValue] = useState<number>(0);
  const theme = useTheme();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: theme.palette.mode === "light" ? "#fafafa" : "#141416ff",
        height: '10vh',
        alignItems: "center",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
      }}>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="tabs example"
        sx={{
          display: "flex",
          justifyContent: "center",
          "& .MuiTabs-indicator": {
            backgroundColor: "#9E3FFD",
          },
          "& .MuiTab-root": {
            color: theme.palette.text.primary,
            "&.Mui-selected": {
              color: "#9E3FFD",
            }
          },
        }}
      >
        <Tab label="Commands" component={Link} to='/' />
        <Tab label="Notes" component={Link} to='/notes' />
      </Tabs>
    </Box>
  );
}