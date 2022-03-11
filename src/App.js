import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppBar, CssBaseline, Divider, Drawer, ListItem, ListItemIcon, ListItemText, Tab, Tabs, Toolbar, Typography, List, Button } from '@mui/material';
import { Box } from '@mui/system';
import AppDrawer from './components/AppDrawer/AppDrawer';

const drawerWidth = 220

function App() {
  return (
    <Box sx={{display: `flex`}}>
      <CssBaseline/>
      <AppBar sx={{
        width: `calc(100% - ${drawerWidth}px)`, 
        ml: `${drawerWidth}px`, 
        boxShadow:'none', 
        bgcolor:'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        color: '#333'
      }}>
        <Toolbar>
          <Typography variant='h5'>Dashboard</Typography>
        </Toolbar>
        <Divider/>
      </AppBar>
      <AppDrawer dwidth = {drawerWidth}/>
      <Box
        component='main'
        sx={{flexGrow:1, bgcolor:'Background.default',p:3}}
      >
        <Toolbar/>
        <Typography paragraph>
          Hi
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
