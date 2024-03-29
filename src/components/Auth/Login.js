import React from 'react';

import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import loginImage from '../../assets/login-bg.jpg';
import { FcGoogle } from 'react-icons/fc';
import ReactTooltip from 'react-tooltip';

import {
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

import gmailApi from "../../controllers/GmailAPI/GmailAPI";

const tooltipMsg = "Custom sign in is not supported. Please use SIGN IN WITH GOOGLE.";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
            COMP4801 FYP20054 All rights reserved
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        textAlign: 'left'
    },
    image: {
        backgroundImage: `url(${loginImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(5, 4, 2, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#1976D2',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 1),
    },
}));

export default function SignInSide() {
    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();
    const isAuth = JSON.parse(localStorage.getItem('isLoggedIn'));

    const { from } = location.state || { from: { pathname: "/login" } };

    const googleLogin = () => {
        gmailApi.handleSignIn().then((msg) => {
            if (msg) {
                localStorage.setItem('isLoggedIn', JSON.stringify(true))
                history.replace(from);
            }
        });
    };

    return (
        <>
            {
                isAuth ?
                    (
                        <Redirect to={{ pathname: '/dashboard' }} />
                    ) :
                    (
                        <Grid container component="main" className={classes.root}>
                            <CssBaseline />
                            <Grid item xs={false} sm={4} md={7} className={classes.image} onClick={() => window.location.href="/"}>
                                <Grid item xs={6}>HHH</Grid>
                            </Grid>
                            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                                <div className={classes.paper}>
                                    <Avatar className={classes.avatar}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Sign in
                                    </Typography>
                                    <form className={classes.form} noValidate>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoFocus
                                            data-tip={tooltipMsg}
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            data-tip={tooltipMsg}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        />
                                        <span data-tip={tooltipMsg} data-tip-disable={false}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                disabled
                                                className={classes.submit}
                                            >
                                                Sign In
                                            </Button>
                                        </span>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="default"
                                            className={classes.submit}
                                            startIcon={<FcGoogle />}
                                            onClick={googleLogin}
                                        >
                                            
                                            Sign In with Google
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link href="#" variant="body2">
                                                    Forgot password?
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link href="#" variant="body2">
                                                    {"Don't have an account? Sign Up"}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                        
                                        <Box mt={5}>
                                            <Alert severity="info">
                                                Since the application have not been verified by Google. Inc and hence, we suggest you to use the following demo Google account for security reason.
                                                <br></br>
                                                <p>
                                                    - Account: fyp20054@gmail.com
                                                    <br/>
                                                    - Password: fyp123456
                                                </p>
                                                <p></p>
                                                
                                            </Alert>
                                        </Box>
                                        <Box mt={5}>
                                            <Copyright />
                                        </Box>
                                    </form>
                                </div>
                            </Grid>
                            <ReactTooltip type="info"/>
                        </Grid>
                    )
            }
        </>
    );
}