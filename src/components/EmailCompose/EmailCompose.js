import React, { useState, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';

import AccountCircle from '@material-ui/icons/AccountCircle';
import CreateIcon from '@material-ui/icons/Create';
import SendIcon from '@material-ui/icons/Send';

import MuiAlert from '@material-ui/lab/Alert';

import GmailAPI from '../../controllers/GmailAPI/GmailAPI';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} variant="filled" {...props} ref={ref} />);

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const useStyles = makeStyles((theme) => ({
    roots: {
        margin: theme.spacing(4, 7, 0, 8)
    },
    margin: {
        margin: theme.spacing(0),
    },
    margin2: {
        margin: theme.spacing(3, 0, 2, 0),
    },
    button: {
        margin: theme.spacing(0),
        backgroundColor: '#3F51B5'
    },
    helperText: {
        marginLeft: '0'
    }
}));

export default function Compose(props) {
    const classes = useStyles();

    const receiver = useRef();
    const subject = useRef();
    const content = useRef();

    const [errorReceiver, setErrorReceiver] = useState({
        error: false,
        errorText: " "
    })

    const [errorSubject, setErrorSubject] = useState({
        error: false,
        errorText: " "
    })

    const [errorContent, setErrorContent] = useState({
        error: false,
        errorText: " "
    })

    const [open, setOpen] = useState(false);

    function validateForm(receiver, subject, content) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValidate = true;

        // validate receiver
        if (!receiver) {
            setErrorReceiver({
                error: true,
                errorText: "This field must not be empty."
            })
            isValidate = false
        }
        else if (!(re.test(String(receiver).toLowerCase()))) {
            setErrorReceiver({
                error: true,
                errorText: "Please enter a valid email address."
            })
            isValidate = false
        }
        else {
            setErrorReceiver({
                error: false,
                errorText: " "
            })
        }

        // validate subject
        if (!subject) {
            setErrorSubject({
                error: true,
                errorText: "This field must not be empty."
            })
            isValidate = false
        }
        else {
            setErrorSubject({
                error: false,
                errorText: " "
            })
        }

        // validate content
        if (!content) {
            setErrorContent({
                error: true,
                errorText: "This field must not be empty."
            })
            isValidate = false
        }
        else {
            setErrorContent({
                error: false,
                errorText: " "
            })
        }

        return isValidate;
    }

    function handleSubmit(event) {
        event.preventDefault();

        const receiverValue = receiver.current.value
        const subjectrValue = subject.current.value
        const contentValue = content.current.value

        const isValidate = validateForm(receiverValue, subjectrValue, contentValue)
        console.log(isValidate)

        if (isValidate) {
            console.log('receiver: ', receiverValue, 'subject: ', subjectrValue, 'content: ', contentValue);
            GmailAPI.getProfile().then(response => {
                const sender = response.emailAddress
                GmailAPI.sendMessage(sender, receiverValue, subjectrValue, contentValue)
            })
            receiver.current.value = "";
            subject.current.value = "";
            content.current.value = "";
            setOpen(true);
        }

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className={classes.roots}>
            <form onSubmit={handleSubmit} >
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                id="input-receiver"
                                label="Receiver"
                                fullWidth
                                autoComplete='off'
                                inputRef={receiver}
                                error={errorReceiver.error}
                                helperText={errorReceiver.errorText}
                                onKeyPress={(ev) => {
                                    if (ev.key === 'Enter') {
                                        ev.preventDefault();
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <CreateIcon />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                id="input-subject"
                                label="Subject"
                                fullWidth
                                autoComplete='off'
                                inputRef={subject}
                                error={errorSubject.error}
                                helperText={errorSubject.errorText}
                                onKeyPress={(ev) => {
                                    if (ev.key === 'Enter') {
                                        ev.preventDefault();
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.margin2}>
                    <Grid container spacing={1} alignItems="flex-start">
                        <Grid item>
                            <CreateIcon />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                id="input-content"
                                label="Content"
                                placeholder="Content"
                                rows={15}
                                fullWidth
                                multiline
                                variant="filled"
                                autoComplete='off'
                                inputRef={content}
                                error={errorContent.error}
                                helperText={errorContent.errorText}
                                FormHelperTextProps={{
                                    className: classes.helperText
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-start">
                        <Grid item >
                            <CreateIcon style={{ color: 'transparent' }} />
                        </Grid>
                        <Grid item >
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<SendIcon />}
                                type="submit"
                            >
                                Send
                        </Button>
                        </Grid>
                    </Grid>
                </div>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} TransitionComponent={SlideTransition}>
                <Alert onClose={handleClose} severity="success">
                    Email sent!
                </Alert>
            </Snackbar>
        </div>
    );
}