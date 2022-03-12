import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import AppDrawer from './components/AppDrawer/AppDrawer';
import AppDashboard from './pages/AppDashboard/AppDashboard';
import { MainContainer } from './components/MainContainer/MainContainer';
import AppProfile from './pages/AppProfile/AppProfile';
import { HashRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from '@mui/icons-material';

const drawerWidth = 220

const MakeComponent = ({ title, children }) => {
  <MainContainer title={title} drawerWidth={drawerWidth}>
    {children}
  </MainContainer>
}

function App() {
  return (
    <Box sx={{ display: `flex` }}>
      <HashRouter>
        <CssBaseline />
        <AppDrawer dwidth={drawerWidth} />
        <Routes>
          <Route exact path= '/' component={AppDashboard}/>
          <Route path= '/profile' component={AppProfile}/>
        </Routes>
      </HashRouter>
    </Box>
  );
}

export default App;