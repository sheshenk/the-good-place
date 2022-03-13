import { useState, useEffect } from 'react';

// material-ui
import {
    Box,
    Button,
    Divider,
    Grid,
    TextField,
    Typography
} from '@mui/material';

// project imports
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import firebaseSvc from 'views/firebaseAuth/firebaseSvc';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
    const [checked, setChecked] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username && email && password) {
            handleRegister(username, email, password);
        } else {
            // Either Name or Email or Password is missing
            setChecked(false);
            setErrorMsg("All fields are required!");
        }
    };

    const handleRegister = (name, email, password) => firebaseSvc.createUser({name: name, email: email, password: password}, registerSuccess, registerFailure);

    /**
     * Callback Function if the register is successful.
     */
    const registerSuccess = () => {
        console.log("Account successfully created!");
        //TODO: Store it under User ID
        //TODO: Match with Project
        //TODO: Redirect to dashboard
    };

    /**
     * Callback function if the register is unsuccessful.
     * 
     * @param {*} err The Error Object with structure
     * {
     *      code: Error Code,
     *      message: Error Description
     * }
     */
     const registerFailure = (err) => {
        const code = err.code;
        let message = '';
        switch(code) {
            case "auth/invalid-email": message = "Invalid Email!";
            break;
            case "auth/email-already-in-use": message = "This Email already has an account";
            break;
            default: message = "Sign Up unsuccessful, try again";
            break;
        }
        
        setErrorMsg(message);
        setChecked(false);
        console.error(err.code, err.message);
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
                {!checked && 
                    <Typography variant="subtitle2">
                        {
                            errorMsg
                        }
                    </Typography>
                }
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                    id="register-name"
                    label="Name"
                    variant="filled"
                    onChange={(event) => setUsername(event.target.value)}
                    />
                    <TextField
                    id="register-email"
                    label="Email Address"
                    variant="filled"
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                    id="register-password"
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
                    >
                        Sign Up
                    </Button>
                </form>
            </Grid>

        </>
    );
};

export default FirebaseRegister;