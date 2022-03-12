import { Divider, Drawer, Toolbar, List, Link } from '@mui/material';
import { AccountCircle, ChromeReaderMode, Dashboard, FormatListBulleted, TokenRounded } from '@mui/icons-material';
import logo from './logo.png'
import { AppDrawerItem } from '../AppDrawerItem/AppDrawerItem';
function AppDrawer(props) {
  return (
    <Drawer
      sx={{
        width: `${props.dwidth}px`,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: `${props.dwidth}px`,
          boxSizing: 'border-box'
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Link to='/'>
          <img src={logo} alt='logo' />
        </Link>
      </Toolbar>
      <Divider />
      <List>
        <AppDrawerItem text='Dashboard' to='/'><Dashboard /></AppDrawerItem>
      </List>
      <Divider />
      <List>
        <AppDrawerItem text='Your Profile' to='/profile'><AccountCircle /></AppDrawerItem>
        <AppDrawerItem text='Certifications' to='/certs'><TokenRounded /></AppDrawerItem>
      </List>
      <Divider />
      <List>
        <AppDrawerItem text='Stories' to='/stories'><ChromeReaderMode /></AppDrawerItem>
        <AppDrawerItem text='Projects' to='/projects'><FormatListBulleted /></AppDrawerItem>
      </List>
      <Divider />
    </Drawer>
  )
}
export default AppDrawer