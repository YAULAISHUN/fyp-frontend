import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import StarBorder from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';

import Checkbox from '../Checkbox/Checkbox';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
    },
    listItem: {
        borderBottom: "1px solid rgb(212, 212, 212)",
    },
    textStyleForSender: {
        fontWeight: 'bold'
    },
    textStyleForSubject: {
        fontWeight: 'bold',
        display: 'inline'
    },
    divider: {
        height: '1.2px',
        background: 'rgba(0, 0, 0, 0.2)',
    },
}));

export default function EmailList(props) {
    const classes = useStyles([]);

    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        props.emailList.length === 0 ?
            (
                <>
                    <Box m={1}>
                        <div>No {props.label} messages</div>
                    </Box>
                    <Snackbar 
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert onClose={handleClose} severity="info">
                            There is no {props.label} messages!
                        </Alert>
                    </Snackbar>
                </>
            ) :
            (
                <>
                    <List>
                        {props.emailList.map((email, index) => (
                            <ListItem button dense className={classes.listItem} key={email["id"]} onClick={() => props.listItemOnClickHandler(email["id"])}>
                                <div style={{ display: "flex", minWidth: '7rem' }}>
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                    // checked={email['checked']}
                                    // onClick={() => {
                                    //     const newInbox = state.inbox;
                                    //     const checked = newInbox[1]['checked'];
                                    //     newInbox[1]['checked'] = !checked
                                    //     setState({ ...state, inbox: newInbox})
                                    // }}
                                    />
                                    <Checkbox
                                        icon={<StarBorder fontSize="small" />}
                                        checkedIcon={<StarIcon fontSize="small" />}
                                    />
                                </div>
                                <div style={{ display: '', overflow: "hidden", textOverflow: "ellipsis", height: '1.5rem', width: '10rem', minWidth: '10rem' }}>
                                    <Typography noWrap className={classes.textStyleForSender}>
                                        {props.label === "sent" ?
                                        (
                                            "To:\t" + email['to'].split("<")[0].replace(/['"]+/g, '')
                                        ):
                                        (
                                            email['from'].split("<")[0].replace(/['"]+/g, '')
                                        )
                                        }
                                        
                                    </Typography>
                                </div>
                                <div style={{ minWidth: '4rem' }} />

                                <div style={{ display: '', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", height: '1.5rem', }}>
                                    <strong>{email['subject']}</strong>
                                    <span>{' - ' + email['snippet']}</span>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </>
            )

    );
}