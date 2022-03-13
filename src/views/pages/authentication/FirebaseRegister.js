import { useState, useEffect } from 'react';

// material-ui
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    Grid,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from '@mui/material';

// project imports
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import firebaseSvc from 'views/firebaseAuth/firebaseSvc';
import { skillList, prefList } from 'views/utilities/Constants';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
    const [checked, setChecked] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    const [skills, setSkills] = useState([]);// List of all chosen skills
    const [other, setOther] = useState('');// Other Skills they possess
    const [preferences, setPrefs] = useState([]);//Project Preference

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username && email && password) {
            handleRegister(username, email, password, skills, other, preferences);
        } else {
            // Either Name or Email or Password is missing
            setChecked(false);
            setErrorMsg("All fields are required!");
        }
    };

    const addNameAndDetails = (name, skills, otherSkill, prefs) => () => firebaseSvc.addUserName(name, () => {
        console.log("User Name Added");
        let user = {
            name: name,
            email: email,
            hours: 0
        };
        user["otherSkill"] = otherSkill;
        skills.forEach(skill => user[skill] = true);
        prefs.forEach(pref => user[pref] = true);
        firebaseSvc.addUserToDb(user, registerSuccess(user), registerFailure);
    },
    registerFailure);

    const handleRegister = async (name, email, password, skills, otherSkill, prefs) => {
        await firebaseSvc.createUser({email: email, password: password}, addNameAndDetails(name, skills, otherSkill, prefs), registerFailure);
    };

    /**
     * Callback Function if the register is successful.
     */
    const registerSuccess = (user) => () => {
        console.log("Account successfully created!");
        // firebaseSvc.matchProjectCurrentUser(user);
        window.location.href = "/";
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

    const handleSkillsChange = (event) => {
        const {
          target: { value },
        } = event;
        setSkills(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      const handlePrefsChange = (event) => {
        const {
          target: { value },
        } = event;
        setPrefs(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
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
                    <center>
                    <TextField
                    id="register-name"
                    label="Name"
                    variant="outlined"
                    onChange={(event) => setUsername(event.target.value)}
                    style={{width:'80%', margin: 10}}
                    />
                    <TextField
                    id="register-email"
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    style={{width:'80%', margin: 10}}
                    />
                    <TextField
                    id="register-password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    style={{width:'80%', margin: 10}}
                    onChange={(event) => {
                        changePassword(event.target.value);
                        setPassword(event.target.value);
                        }}
                    />
                    {/* Password Strength Checker */}
                    {strength !== 0 && (
                                <FormControl fullWidth>
                                    <Box sx={{ mb: 2, ml: 33 }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Box
                                                    style={{ backgroundColor: level?.color }}
                                                    sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1" fontSize="0.75rem">
                                                    {level?.label}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </FormControl>
                    )}
                    <Divider/>
                    <Grid item xs={12} container alignItems="center" justifyContent="center">
                        <Box sx={{ mb: 2, mt: 2 }}>
                            <Typography variant="subtitle1">Share what you're great at!</Typography>
                        </Box>
                    </Grid>
                    <Select
                        id="register-skills"
                        multiple
                        label="Skills"
                        value={skills}
                        onChange={handleSkillsChange}
                        renderValue={(selected) => selected.join(', ')}
                        input={<OutlinedInput label="Skills"/>}
                        style={{width:'70%', margin: 10}}
                    >
                        {skillList.map((skillName) => (
                            <MenuItem
                                key={skillName}
                                value={skillName}>
                                <Checkbox checked={skills.indexOf(skillName) > -1} />
                                <ListItemText primary={skillName} />
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        id='register-otherskills'
                        label="Other Skills to Share"
                        type='text'
                        variant='outlined'
                        style={{width:'70%', margin: 10, marginBottom: 20}}
                        onChange={(event) => {
                            setOther(event.target.value);
                        }}
                    />
                    <Divider/>
                    <Grid item xs={12} container alignItems="center" justifyContent="center">
                        <Box sx={{ mb: 2, mt: 2 }}>
                            <Typography variant="subtitle1">Project Working Preferences</Typography>
                        </Box>
                    </Grid>
                    <Select
                        id="register-preference"
                        multiple
                        value={preferences}
                        onChange={handlePrefsChange}
                        renderValue={(selected) => selected.join(', ')}
                        input={<OutlinedInput label="Preferences"/>}
                        style={{width:'70%', margin: 10, marginBottom: 20}}
                        
                    >
                        {prefList.map((pref) => (
                            <MenuItem
                                key={pref}
                                value={pref}>
                                <Checkbox checked={preferences.indexOf(pref) > -1} />
                                <ListItemText primary={pref} />
                            </MenuItem>
                        ))}
                    </Select>
                    <Divider/>
                    <Button
                    color='inherit'
                    size = 'large'
                    sx = {{
                        
                        margin: '2%',
                        mt: 3,
                        height: 50,
                        width:`35%`
                    }}
                    variant = 'outlined'
                    type = 'submit'
                    >
                        Sign Up
                    </Button>
                    </center>
                </form>
            </Grid>

        </>
    );
};

export default FirebaseRegister;