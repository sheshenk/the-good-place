import { useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik, setIn } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from 'assets/images/icons/social-google.svg';
import { mailRegex } from 'views/utilities/Constants';
import firebaseSvc from 'views/firebaseAuth/firebaseSvc';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [checked, setChecked] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [emailError, setEmailError] = useState("");

    const validateEmail = () => {
        setInvalidEmail(!(mailRegex.test(email)));
        setEmailError("Invalid Email Address");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email && password) {
            handleLogin(email, password);
        }
    };

    const handleLogin = (email, password) => firebaseSvc.login({email: email, password: password}, loginSuccess, loginFailure);

    const loginSuccess = (user) => {console.log(user)};
    const loginFailure = (err) => {console.error(err)};

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign in with Email address</Typography>
                    </Box>
                </Grid>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                    id="login-email"
                    variant="filled"
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                    id="login-password"
                    label="Password"
                    type="password"
                    variant="filled"
                    onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button
                    color='inherit'
                    size = 'large'
                    sx = {{
                        margin: '2%',
                        height: 50
                    }}
                    variant = 'outlined'
                    type = 'submit'
                    onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                </form>
            </Grid>
        </>
    );
};

export default FirebaseLogin;