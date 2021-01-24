import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import TablePagination from '@material-ui/core/TablePagination';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import StarBorder from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import Typography from '@material-ui/core/Typography';

import Checkbox from './Checkbox/Checkbox';
import { SatelliteSharp } from '@material-ui/icons';
import { Divider } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';

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

const inboxArray1 = Array(12).fill(
    {
        sender: 'Yau Lai Shun',
        subject: 'Hello, I\'m Shawn!',
        content: 'This is a sample email for testing purpose only! This is a sample email for testing purpose only! This is a sample email for testing purpose only! This is a sample email for testing purpose only!',
        checked: false
    }
);

const inboxArray2 = Array(12).fill(
    {
        sender: 'Wu Zekai',
        subject: 'Hello, I\'m Tommy!',
        content: 'This is a sample email for testing purpose only! This is a sample email for testing purpose only! This is a sample email for testing purpose only! This is a sample email for testing purpose only!',
        checked: false
    }
);

const inboxArray3 = Array(2).fill(
    {
        sender: 'FYP Supervisor',
        subject: 'Hello, I\'m your FYP supervisor!',
        content: 'This is a sample email for testing purpose only! This is a sample email for testing purpose only! This is a sample email for testing purpose only! This is a sample email for testing purpose only!',
        checked: false
    }
);

export default function Inbox(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        inbox: [...inboxArray1, ...inboxArray2, ...inboxArray3],
        itemsPerPage: 12,
    });

    const [page, setPage] = React.useState(0)

    const [noOfPages] = React.useState(

    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

    // const handleChange = (event, value) => {
    //     setState({ ...state, page: value });
    // };
    return (
        <div className={classes.root}>
            {/* <Box component="span">
                <Pagination
                    count={Math.ceil(state.inbox.length / state.itemsPerPage)}
                    page={state.page}
                    onChange={handleChange}
                    defaultPage={1}
                    color="primary"
                    classes={{ ul: classes.paginator }}
                />
            </Box> */}
            <Box display="flex" pl="16px" pr="16px" alignItems="center">
                <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    disabled
                    // onChange={() => {
                    //     const newInbox = state.inbox;
                    //     for (var i = (state.page) * state.itemsPerPage; i < (state.page + 1) * state.itemsPerPage; i++) {
                    //         const checked = newInbox[i]['checked'];
                    //         console.log(checked)
                    //         // newInbox[i]['checked'] = !checked;
                    //     }
                    //     setState({ ...state, inbox: newInbox});
                    // }}
                />
                <Grid container justify="flex-end">
                    <TablePagination
                        component="div"
                        count={state.inbox.length}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={state.itemsPerPage}
                        //   onChangeRowsPerPage={handleChangeRowsPerPage}
                        rowsPerPageOptions={[]}
                    />
                </Grid>



            </Box>

            <Divider className={classes.divider}/>
            <List>
                {state.inbox
                    .slice((page) * state.itemsPerPage, (page + 1) * state.itemsPerPage)
                    .map((email, index) => (
                        <ListItem button dense className={classes.listItem} key={index * (page + 1)}>
                            <div style={{ display: "flex", width: '10rem' }}>
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
                            <div style={{ display: '', overflow: "hidden", textOverflow: "ellipsis", height: '1.5rem', minWidth: '6rem' }}>
                                <Typography noWrap className={classes.textStyleForSender}>
                                    {email['sender']}
                                </Typography>
                            </div>
                            {/* <div style={{ display: 'flex', overflow: "hidden", textOverflow: "ellipsis", height: '1.5rem' }}>
                            
                        </div> */}
                            <div style={{ width: '8rem' }} />
                            <div style={{ display: 'flex', overflow: "hidden", textOverflow: "ellipsis", height: '1.5rem' }}>

                                <Typography >
                                    <Typography className={classes.textStyleForSubject}>
                                        {email['subject']}
                                    </Typography>
                                    {' - ' + email['content']}
                                </Typography>
                            </div>
                        </ListItem>
                    ))}
            </List>
        </div>
    )
}
