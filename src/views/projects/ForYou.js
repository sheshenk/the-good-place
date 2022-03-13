import { Avatar, Card, CardActions, CardHeader, CardMedia, Grid, IconButton, Link } from '@mui/material';
import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { Typography, CardContent } from '@mui/material';
import { IconAlien } from '@tabler/icons';
import { ShareOutlined, StarBorder } from '@mui/icons-material';
import firebaseSvc, { useAuthListener } from 'views/firebaseAuth/firebaseSvc';
import { Navigate } from 'react-router';
import { useEffect, useState } from 'react';

// ==============================|| TYPOGRAPHY ||============================== //

const ProjectCard = (props) => {
    return (
        <Grid item xs={3}>
            <Card sx={{ maxWidth: 345 }}>
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
<<<<<<< Updated upstream
        const getProjs = async () => {
            const projs = await firebaseSvc.allProjectsFromDb((snapshot) => {
                let projs = snapshot.val()
                setProjs(Object.values(projs))
            })
        }
        getProjs()
    }, [])
=======
        const getProjs = async() => {
            const projs = firebaseSvc.db
            console.log(projs)
            if (projs) {
                
                setProjs(projs)
            }
            
        }
        getProjs()
     }, [])
>>>>>>> Stashed changes

    if (!loggedIn) return <Navigate to='/pages/login/login3' />

    return (
        <Grid container spacing={4}>
            {
                projs.map(proj => <ProjectCard {...proj} />)
            }
        </Grid>
    )

    // <MainCard title="Basic Typography" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>

    //     <Grid container spacing={gridSpacing}>
    //         <Grid item xs={12} sm={6}>
    //             <SubCard title="Heading">
    //                 <Grid container direction="column" spacing={1}>
    //                     <Grid item>
    //                         <MuiTypography variant="h1" gutterBottom>
    //                             h1. Heading
    //                         </MuiTypography>
    //                     </Grid>
    //                     <Grid item>
    //                         <MuiTypography variant="h2" gutterBottom>
    //                             h2. Heading
    //                         </MuiTypography>
    //                     </Grid>
    //                     <Grid item>
    //                         <MuiTypography variant="h3" gutterBottom>
    //                             h3. Heading
    //                         </MuiTypography>
    //                     </Grid>
    //                     <Grid item>
    //                         <MuiTypography variant="h4" gutterBottom>
    //                             h4. Heading
    //                         </MuiTypography>
    //                     </Grid>
    //                     <Grid item>
    //                         <MuiTypography variant="h5" gutterBottom>
    //                             h5. Heading
    //                         </MuiTypography>
    //                     </Grid>
    //                     <Grid item>
    //                         <MuiTypography variant="h6" gutterBottom>
    //                             h6. Heading
    //                         </MuiTypography>
    //                     </Grid>
    //                 </Grid>
    //             </SubCard>
    //         </Grid>
    //         <Grid item xs={12} sm={6}>
    //             <SubCard title="Sub title">
    //                 <Grid container direction="column" spacing={1}>
    //                     <Grid item>
    //                         <MuiTypography variant="subtitle1" gutterBottom>
    //                             subtitle1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
    //                         </MuiTypography>
    //                     </Grid>
    //                     <Grid item>
    //                         <MuiTypography variant="subtitle2" gutterBottom>
    //                             subtitle2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
    //                         </MuiTypography>
    //                     </Grid>
    //                 </Grid>
    //             </SubCard>
    //         </Grid>
    //         <Grid item xs={12} sm={6}>
    //             <SubCard title="Body">
    //                 <Grid container direction="column" spacing={1}>
    //                     <Grid item>
    //                         <MuiTypography variant="body1" gutterBottom>
    //                             body1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde suscipit, quam
    //                             beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
    //                             Eum quasi quidem quibusdam.
    //                         </MuiTypography>
    //                     </Grid>
    //                     <Grid item>
    //                         <MuiTypography variant="body2" gutterBottom>
    //                             body2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde suscipit, quam
    //                             beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
    //                             Eum quasi quidem quibusdam.
    //                         </MuiTypography>
    //                     </Grid>
    //                 </Grid>
    //             </SubCard>
    //         </Grid>
    //         <Grid item xs={12} sm={6}>
    //             <SubCard title="Extra">
    //                 <Grid container direction="column" spacing={1}>
    //                     <Grid item>
    //                         <MuiTypography variant="button" display="block" gutterBottom>
    //                             button text
    //                         </MuiTypography>
    //                     </Grid>
    //                     <Grid item>
    //                         <MuiTypography variant="caption" display="block" gutterBottom>
    //                             caption text
    //                         </MuiTypography>
    //                     </Grid>
    //                     <Grid item>
    //                         <MuiTypography variant="overline" display="block" gutterBottom>
    //                             overline text
    //                         </MuiTypography>
    //                     </Grid>
    //                     <Grid item>
    //                         <MuiTypography
    //                             variant="body2"
    //                             color="primary"
    //                             component={Link}
    //                             href="https://berrydashboard.io"
    //                             target="_blank"
    //                             display="block"
    //                             underline="hover"
    //                             gutterBottom
    //                         >
    //                             https://berrydashboard.io
    //                         </MuiTypography>
    //                     </Grid>
    //                 </Grid>
    //             </SubCard>
    //         </Grid>
    //     </Grid>
    // </MainCard>
};

export default ForYou;
