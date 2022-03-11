import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppBar, CssBaseline, Divider, Drawer, ListItem, ListItemIcon, ListItemText, Tab, Tabs, Toolbar, Typography, List, Button } from '@mui/material';
import { Box } from '@mui/system';
import AppDrawer from './components/AppDrawer/AppDrawer';
import AppDashboard from './pages/AppDashboard/AppDashboard';
import { Dashboard } from '@mui/icons-material';
import { MainContainer } from './components/MainContainer/MainContainer';

const drawerWidth = 220

function App() {
  return (
    <Box sx={{display: `flex`}}>
      <CssBaseline/>
      <AppDrawer dwidth = {drawerWidth}/>
      <MainContainer title='Dashboard' drawerWidth={drawerWidth}>
        <AppDashboard/>
      </MainContainer>
    </Box>
  );
}

export default App;