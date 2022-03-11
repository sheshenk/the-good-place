import { Divider, Drawer, ListItem, ListItemIcon, ListItemText, Toolbar,List } from '@mui/material';
import { AccountCircle, ChromeReaderMode, Dashboard, FormatListBulleted, TokenRounded } from '@mui/icons-material';
import logo from './logo.png'
function AppDrawer(props) {
    return (
    <Drawer
        sx={{
          width:`${props.dwidth}px`,
          flexShrink:0,
          '& .MuiDrawer-paper': {
            width:`${props.dwidth}px`,
            boxSizing: 'border-box'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <img src={logo}/>
        </Toolbar>
        <Divider/>
        <List>
          <ListItem button key='Dashboard'>
            <ListItemIcon>
              <Dashboard/>
            </ListItemIcon>  
            <ListItemText primary = 'Dashboard'/>
          </ListItem>
        </List>
        <Divider/>
        <List>
          <ListItem button key='Your Profile'>
            <ListItemIcon>
              <AccountCircle/>
            </ListItemIcon>  
            <ListItemText primary = 'Your Profile'/>
          </ListItem>
          <ListItem button key='Certifications'>
            <ListItemIcon>
              <TokenRounded/>
            </ListItemIcon>  
            <ListItemText primary = 'Certifications'/>
          </ListItem>
        </List>
        <Divider/>
        <List>
          <ListItem button key='Stories'>
            <ListItemIcon>
              <ChromeReaderMode/>
            </ListItemIcon>  
            <ListItemText primary = 'Stories'/>
          </ListItem>
          <ListItem button key='Projects'>
            <ListItemIcon>
              <FormatListBulleted/>
            </ListItemIcon>  
            <ListItemText primary = 'Projects'/>
          </ListItem>
        </List>
        <Divider/>
      </Drawer>
    )}
export default AppDrawer