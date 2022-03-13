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
                        {props.descr}
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

const ForYou = () => (
    <Grid container spacing={4}>
        <ProjectCard title='Wash a Child' date='2 hours ago' img='https://randomwordgenerator.com/img/picture-generator/51e6dd444a54b10ff3d8992cc12c30771037dbf85254794e732f7bd49344_640.jpg' descr = 'Project 1'/>
        <ProjectCard title='Wash a Cow' date = 'Yesterday' img='https://randompicturegenerator.com/img/love-generator/g37162edefdbabbc82b1ccfa6fb1d0d9ddcfc6da100fc8dbf40d0fbd8621ed245b1d92b729fb11c1cd9fe6bcb4535c71b_640.jpg' descr = 'Project 2'/>
        <ProjectCard title='Wash your Mouth' date = '3 days ago' img='https://randompicturegenerator.com/img/love-generator/g186ab2762497481beec6840cbd4d092ba96557798db32eb957c428f3583bcc209fe9e86653edc6557b72c53f385306a1_640.jpg' descr = 'Project 3'/>
    </Grid>

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
);

export default ForYou;
