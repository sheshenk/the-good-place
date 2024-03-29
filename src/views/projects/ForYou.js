import { Card, CardActions, CardHeader, CardMedia, CircularProgress, Grid, IconButton } from '@mui/material';

// project imports
import { Typography, CardContent } from '@mui/material';
import { ShareOutlined, StarBorder } from '@mui/icons-material';
import firebaseSvc, { useAuthListener } from 'views/firebaseAuth/firebaseSvc';
import { Navigate } from 'react-router';
import { useEffect, useState } from 'react';

// ==============================|| TYPOGRAPHY ||============================== //

const ProjectCard = (props) => {
    return (
        <Grid item xs={3}>
            <Card sx={{ width: '100%' }}>
                <CardHeader
                    title={props.title}
                    subheader={props.date}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={props.img}
                    alt=""
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.desc}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add project">
                        <StarBorder />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareOutlined />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}

const ForYou = () => {

    const { loggedIn, checkingStatus } = useAuthListener();
    const [projs, setProjs] = useState([])

    useEffect(() => {
        const getProjs = async () => {
            await firebaseSvc.allProjectsFromDb((snap) => {
                if (snap.val() !== undefined && snap.val() !== null) {
                    const projs = Object.values(snap.val());
                    setProjs(projs);
                    return () => firebaseSvc.projectsRefOff();
                }
            })
        }
        getProjs()
    }, [])

    if (checkingStatus) return <CircularProgress/>

    if (!loggedIn) return <Navigate to='/login' />

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography variant="h1" component="div" ml={2} my={2} gutterBottom>
                For You
            </Typography>
            </Grid>
            {
                projs.map(proj => <ProjectCard props={proj} />)
            }
        </Grid>
    )
};

export default ForYou;
