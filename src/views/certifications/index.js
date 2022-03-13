// material-ui
import { Container, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import firebaseSvc from 'views/firebaseAuth/firebaseSvc';


// ==============================|| SAMPLE PAGE ||============================== //


const Certificate = () => (

    <Card sx={{ maxWidth: 345, maxHeight: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image=""
          alt="certificate"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name
          </Typography>
          <Typography variant="body2" color="text.primary">
            Project:
          </Typography>
          <Typography variant="body2" color="text.primary">
            Hours Contributed: 
          </Typography>
          <Typography variant="body2" color="text.primary">
            Level of Achievement: 
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
        const certificates = firebaseSvc.getAllCertificatesFromDb();
        setCertificates(certificates);
        return () => firebaseSvc.certsRefOff();
    }, []);

    <Certificate>
    </Certificate>
    
};

export default Certifications;
