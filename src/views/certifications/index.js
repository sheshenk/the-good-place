// material-ui
import { Container, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import firebaseSvc from 'views/firebaseAuth/firebaseSvc';


const Certificate = ({props}) => (

    <Card sx={{ maxWidth: 345}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="194"
          image=""
          alt="certificate"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name
          </Typography>
          <Typography variant="body2" color="text.primary">
            Project: {props.project}
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
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>


);

const Certifications = () => {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
      firebaseSvc.getAllCertificatesFromDb(
        (snap) => {
          const certificates = Object.values(snap.val());
          setCertificates(certificates);
          return () => firebaseSvc.certsRefOff();
        }
      );
    }, []);

    return (
      <Grid item xs={3}>
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
