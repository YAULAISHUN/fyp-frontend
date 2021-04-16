import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import TablePagination from '@material-ui/core/TablePagination';

import IconButton from '@material-ui/core/IconButton'

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Checkbox from './Checkbox/Checkbox';
import { Divider } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';

import Email from './Email/Email'
import EmailList from './EmailList/EmailList'
import gmailApi from "../../controllers/GmailAPI/GmailAPI";

import CircularProgress from '@material-ui/core/CircularProgress';

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
    loading: {
        color: "#606060"
    }
}));

export default function MainBody(props) {
    const label = props.label;

    const classes = useStyles([]);

    // states
    const [messages, setMessages] = useState();
    const [selectedEmail, setSelectedEmail] = useState();
    const [pagination, setPagination] = useState(
        {
            itemsPerPage: 12,
            page: 0
        }
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMessages()
    }, []);

    // event handlers
    const getMessages = () => {
        gmailApi.getMessages(false, 1000, "me", label.toUpperCase()).then(res => {
            setMessages(gmailApi.normalizeData(res));
            setLoading(false);
            
        });
        // const res = await gmailApi.getMessages(false, 5);
        // setMessages(gmailApi.normalizeData(res));
    };

    const selectedEmailHandler = (emailId) => {
        setSelectedEmail(emailId)
    }

    const handleChangePage = (event, newPage) => {
        setPagination(
            {
                itemsPerPage: 12,
                page: newPage
            }
        )
    };

    const Toolbar1 = (
        <>
            <Box display="flex" pl="16px" pr="16px" alignItems="center">
                <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    disabled
                />
                <Grid container justify="flex-end">
                    <div style={{maxHeight: "48px"}}>
                        <TablePagination
                            component="div"
                            count={messages ? messages.length : 0}
                            page={pagination.page}
                            onChangePage={handleChangePage}
                            rowsPerPage={pagination.itemsPerPage}
                            rowsPerPageOptions={[]}
                            backIconButtonProps={{ size: "small" }}
                            nextIconButtonProps={{ size: "small" }}
                        />
                    </div>
                </Grid>
            </Box>
            <Divider className={classes.divider} />
        </>
    );

    const Toolbar2 = (
        <>
            <Box display="flex" pl="16px" pr="16px" alignItems="center">

                <IconButton onClick={() => setSelectedEmail(null)}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>
            <Divider className={classes.divider} />
        </>
    );

    return (
        <div className={classes.root}>
            {!loading ?
                (
                    selectedEmail ?
                        (
                            <>
                                {Toolbar2}
                                <Email email={messages.find(element => element.id === selectedEmail)} />
                            </>
                        ) :
                        (
                            <>
                                {Toolbar1}
                                <EmailList
                                    label={label}
                                    emailList={messages.slice((pagination.page) * (pagination.itemsPerPage), (pagination.page + 1) * (pagination.itemsPerPage))}
                                    listItemOnClickHandler={selectedEmailHandler}
                                />
                            </>
                        )
                )
                :
                (
                    // <div style={{ height: "100%", width: "100%", overflow: "hidden", top: "50%" }}><center>No emails in the {label}</center></div>
                    <div style={{  overflow: "hidden", position: "fixed", top: "50%", left: "55%" }}><center><CircularProgress className={classes.loading}/></center></div>
                )
            }
        </div>
    );

}
