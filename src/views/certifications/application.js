// material-ui
import { Alert, Box, Button, Card, CardContent, CircularProgress, InputLabel, Grid, Select, MenuItem, Snackbar, TextField } from '@mui/material';
import { CardActions, CardHeader, CardMedia, IconButton } from '@mui/material';


// project imports
import MainCard from 'ui-component/cards/MainCard';
import firebaseSvc, { useAuthListener } from 'views/firebaseAuth/firebaseSvc';
import { Navigate } from 'react-router';
import { useEffect, useState } from 'react';
import { ShareOutlined } from '@mui/icons-material';
import { IconHeart } from '@tabler/icons';

const CertApplication = () => {
    const { loggedIn, checkingStatus } = useAuthListener(); 
    
    const [title, setTitle] = useState('')
    const [name, setName] = useState('')
    const [hours, setHours] = useState(0)
    const [level, setLevel] = useState('')

    const [open, setOpen] = useState(false)


    const [inputsDisabled, setInputsDisabled] = useState(false)

    if (checkingStatus) return <CircularProgress/>

    if (!loggedIn) return <Navigate to='/login' />


    const handleSubmit = (e) => {
        e.preventDefault()
        if (title && name && hours && level) {
            setInputsDisabled(true)
            const data = {
                'project': title,
                'hours': hours,
                'name': name,
                'level': level,
                'img': 'https://marketplace.canva.com/EAFIEvneNCM/1/0/1600w/canva-golden-elegant-certificate-of-appreciation-0bN-aLORS9U.jpg'
            }


            firebaseSvc.addCertToDb(data)
        } else {
            setOpen(true)
        }
        
    }

    const handleChange = (event) => {
        setLevel(event.target.value);
    }

    return (
        <MainCard title="Certification Application">
            <form noValidate autoComplete='="off' onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="title"
                            variant='outlined'
                            label="Project Title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="name"
                            variant='outlined'
                            label="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="hours"
                            variant='outlined'
                            label="Hours"
                            onChange={(e) => setHours(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <InputLabel id="demo-simple-select-label">Level</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select"
                          value={level}
                          label="Level"
                          onChange={handleChange}
                        >
                          <MenuItem value={'Advanced'}>Basic</MenuItem>
                          <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                          <MenuItem value={'Basic'}>Advanced</MenuItem>
                        </Select>
                    </Grid>
                    <Button
                        disabled={inputsDisabled}
                            color='inherit'
                            size='large'
                            sx={{

                                margin: '2%',
                                mt: 3,
                                height: 50,
                                width: `35%`
                            }}
                            variant='outlined'
                            type='submit'
                        >
                        Apply
                    </Button>
                </Grid>
            </form>
            <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    message=""
                    onClose={()=>setOpen(false)}
                >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        Enter title and body!
                    </Alert>
            </Snackbar>
        </MainCard>
    )

}

export default CertApplication