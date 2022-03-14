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
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';



const BootstrapDialog = Dialog

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, fontSize: 24 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            fontSize: 34,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};



const Certificate = ({props}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


return (
  <div>
    <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={'md'}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.project}
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <img src={props.img} alt="image" height={600}/>
          <Typography gutterBottom>
            Hours Contributed: {props.hours}
          </Typography>
          <Typography gutterBottom>
            Level of Achievement: {props.level}
          </Typography>
        </DialogContent>
      </Dialog>
    <Card sx={{ maxWidth: 345}}>
      <CardActionArea onClick={handleClickOpen}>
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
            <a href={props.img} download>
              <FileDownload />
            </a>
          </IconButton>
      </CardActions>
    </Card>
    </div>


);
}

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