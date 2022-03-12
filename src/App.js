import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import AppDrawer from './components/AppDrawer/AppDrawer';
import { MainContainer } from './components/MainContainer/MainContainer';
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './routes/AppRoutes';

const drawerWidth = 220

const MakeComponent = ({ title, children }) => {
  <MainContainer title={title} drawerWidth={drawerWidth}>
    {children}
  </MainContainer>
}

function App() {
  return (
    <Box sx={{ display: `flex` }}>
      <BrowserRouter>
        <CssBaseline />
        <AppDrawer dwidth={drawerWidth} />
        <AppRoutes dwidth={drawerWidth}/>
      </BrowserRouter>
    </Box>
  );
}

export default App;