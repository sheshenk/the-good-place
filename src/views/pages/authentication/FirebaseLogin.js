import { useState } from 'react';

import {
    Box,
    Button,
    Divider,
    Grid,
    TextField,
    Typography
} from '@mui/material';

// project imports
import firebaseSvc from 'views/firebaseAuth/firebaseSvc';

// ============================|| FIREBASE - LOGIN ||============================ //
//TODO: Separate Email Text Field from Password Text Field
//TODO: Center the Sign In Button below Text Fields
//TODO: Redirect to dashboard inside loginSuccess handler
const FirebaseLogin = ({ ...others }) => {
    const [checked, setChecked] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // const validateEmail = () => {
    //     setInvalidEmail(!(mailRegex.test(email)));
    //     setEmailError("Invalid Email Address");
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email && password) {
            handleLogin(email, password);
        } else {
            // Either Email or Password is missing
            setChecked(false);
            setErrorMsg("Both fields are required!");
        }
    };

    const handleLogin = (email, password) => firebaseSvc.login({email: email, password: password}, loginSuccess, loginFailure);

    /**
     * Callback Function if the login is successful.
     * 
     * @param {*} user The User Credential Object. Structure is 
     * {
     *      user: User Details Object
     * }
     */
    const loginSuccess = (userCredential) => {
        setChecked(true);
        const user = userCredential.user;
        // Access user.displayName, user.email, user.photoURL, user.phoneNumber, user.emailVerified
        console.log(`${user.name} has logged in!`);
        //TODO: Re-direct to Dashboard from here
        window.location.href = '/'
    };

    /**
     * Callback function if the login is unsuccessful.
     * 
     * @param {*} err The Error Object with structure
     * {
     *      code: Error Code,
     *      message: Error Description
     * }
     */
    const loginFailure = (err) => {
        const code = err.code;
        let message = '';
        switch(code) {
            case "auth/invalid-email": message = "Invalid Email!";
            break;
            case "auth/wrong-password": message = "Wrong Password!";
            break;
            case "auth/user-not-found": message = "No such user exists";
            break;
            default: message = "Login unsuccessful, try again";
            break;
        }
        
        setErrorMsg(message);
        setChecked(false);
        console.error(err.code, err.message);
    };

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
                {!checked && 
                    <Typography variant="subtitle2">
                        {
                            errorMsg
                        }
                    </Typography>
                }
                <form noValidate autoComplete="off" onSubmit={handleSubmit} textAlign='center'>
                    <center>
                    <TextField
                    id="login-email"
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    style={{width:'70%', margin: 10}}
                    />
                    <TextField
                    id="login-password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    onChange={(event) => setPassword(event.target.value)}
                    style={{width:'70%', margin: 10}}
                    />
                    <Button
                    color='inherit'
                    size = 'large'
                    sx = {{
                        margin: '2%',
                        height: 50,
                        width:`35%`
                    }}
                    variant = 'outlined'
                    type = 'submit'
                    >
                        Sign In
                    </Button>
                    </center>
                </form>
            </Grid>
        </>
    );
};

export default FirebaseLogin;