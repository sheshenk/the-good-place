// material-ui
import { Typography } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';


// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Certificate = ({props}) => (
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

const Certifications = () => (
    <Certificate>
    </Certificate>
);


// const Certifications = () => (
//     <MainCard title="Sample Card">
//         <Typography variant="body2">
//             Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
//             ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
//             reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
//             qui officiate descent molls anim id est labours.
//         </Typography>
//     </MainCard>
// );

export default Certifications;
