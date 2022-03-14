// material-ui
import { Container, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions, Grid, IconButton } from '@mui/material';
import firebaseSvc, { useAuthListener } from 'views/firebaseAuth/firebaseSvc';
import { ShareOutlined, StarBorder, FileDownload } from '@mui/icons-material';
import { Navigate } from 'react-router';



const Certificate = ({props}) => (

    <Card sx={{ maxWidth: 345}}>
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

  if (!loggedIn) return <Navigate to='/pages/login/login3' />


  return (
    <Container>
      <Typography variant="h1" component="div" ml={2} my={3} gutterBottom>
        Your Certificates
      </Typography>
    <Grid container justifyContent="space-evenly" alignItems="center">
      {
        certificates.map(cert => (
          <Certificate props={cert}>
          </Certificate>
        ))
      }
    </Grid>

    </Container>
    
  );
};
export default Certifications;
