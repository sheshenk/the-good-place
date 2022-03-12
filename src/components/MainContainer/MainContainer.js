import React from "react"
import { AppBar, Divider, Toolbar, Typography} from '@mui/material';
import { Box } from '@mui/system';

export const MainContainer = ({title, drawerWidth, children }) => {
    return (
        <div>
            <AppBar sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
                boxShadow: 'none',
                bgcolor: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(20px)',
                color: '#333'
            }}>
                <Toolbar>
                    <Typography variant='h5'>{title}</Typography>
                </Toolbar>
                <Divider />
            </AppBar>
            <Box
                component='main'
                sx={{ flexGrow: 1, bgcolor: 'Background.default', p: 3 }}
            >
                <Toolbar />
                {children}
            </Box>
        </div>
    )
}