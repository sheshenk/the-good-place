// material-ui
import { CircularProgress, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions, Grid, IconButton } from '@mui/material';
import firebaseSvc, { useAuthListener } from 'views/firebaseAuth/firebaseSvc';
import { ShareOutlined, FileDownload } from '@mui/icons-material';
import { Navigate } from 'react-router';



const Certificate = ({props}) => (
<Grid item xs={3}>
    <Card sx={{ width:'100%'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="194"
          image={props.img}
          alt="certificate"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.project}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Hours Contributed: {props.hours}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Level of Achievement: {props.level}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          <IconButton aria-label="share">
            <ShareOutlined />
          </IconButton>
          <IconButton aria-label="download">
            <FileDownload />
          </IconButton>
      </CardActions>
    </Card>

</Grid>
);

const Certifications = () => {
  const [certificates, setCertificates] = useState([]);
  const { loggedIn, checkingStatus } = useAuthListener();


  useEffect(() => {
    firebaseSvc.getAllCertificatesFromDb(
      (snap) => {
        const certificates = Object.values(snap.val());
        setCertificates(certificates);
        return () => firebaseSvc.certsRefOff();
      }
    );
  }, []);

  if (checkingStatus) return <CircularProgress/>

  if (!loggedIn) return <Navigate to='/login' />


  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Typography variant="h1" component="div" ml={2} my={3} gutterBottom>
        Your Certificates
      </Typography>
      </Grid>
    
      {
        certificates.map(cert => (
          <Certificate props={cert}>
          </Certificate>
        ))
      }
    </Grid>

    
  );
};
export default Certifications;
