import React, { useState, useEffect, useRef } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

import URLClassifier from '../../controllers/URLClassifier/URLClassifier'
// import Dialog from '../Dialog/Dialog'

// Dialog
// import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Logout from '../Auth/Logout';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'fixed',
        display: 'flex',
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#505050'
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '500px',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        // pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '480px',
        },
    },
    inputInputAdornment: {
        backgroundColor: 'black'
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    zIndex: theme.zIndex.drawer + 1,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppBar(props) {
    const classes = useStyles();
    const [barDetection, setBarDetection] = useState({
        url: '',
        detectedResult: null,
        open: false
    });

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    // const handleMobileMenuOpen = (event) => {
    //     setMobileMoreAnchorEl(event.currentTarget);
    // };


    // Dialog open and close handlers
    const handleDialogOpen = () => {
        setBarDetection({ ...barDetection, open: true })
    };

    const handleDialogClose = () => {
        setBarDetection({ ...barDetection, open: false })
    };

    // URL Check handler
    const urlInputHandler = (url) => {

        URLClassifier.classify(url).then(response => {
            if (response === barDetection.detectedResult) {
                handleDialogOpen()
            }
            else {
                setBarDetection({
                    url: url,
                    detectedResult: response,
                    open: true
                })
            }
        }).catch(error => {
            console.log(error);
        });

        // axios.get('classify?url=' + url)
        //     .then(response => {
        //         console.log(JSON.stringify(response.data, null, ' '))
        //         // alert(response.data['predict'].map(el => {
        //         //     return el['explanation'];
        //         // }).join('\n'));
        //         // console.log(JSON.stringify(response.data, null, ' '))
        //         if (JSON.stringify(response.data, null, ' ') == state.detectedResult) {
        //             handleClickOpen()
        //         }
        //         else{
        //             setState({
        //                 url: url,
        //                 detectedResult: JSON.stringify(response.data, null, ' '),
        //                 open: true
        //             })
        //         }
        //         // console.log(state.detectedResult)
        //         // handleClickOpen();
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }

    // useEffect(() => {
    //     handleClickOpen()
    //  }, [state.detectedResult]);

    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        handleDialogOpen()
    }, [barDetection.detectedResult]);



    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem disabled onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem><Logout /></MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={false}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <Dialog
                open={barDetection.open}
                // TransitionComponent={Transition}
                keepMounted
                maxWidth="lg"
                TransitionComponent={Transition}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"URL Successfully Detected!"}</DialogTitle>
                <DialogContent dividers>
                    {/* <DialogContentText id="alert-dialog-slide-description"> */}

                    <pre id="json" style={{ padding: "1em 2em", color: "#707070" }}>{barDetection.detectedResult}</pre>



                    {/* </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        OK
                </Button>
                    {/* <Button onClick={handleClose} color="primary">
                                Agree
                </Button> */}
                </DialogActions>
            </Dialog>

            <MuiAppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.toggleEvent}
                        disabled
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        FYP20054 Smart Email Client
                    </Typography>
                    <div className={classes.search}>
                        {/* <div className={classes.searchIcon}>
                            <IconButton onClick={e => console.log(e.target.value)}>
                                <SearchIcon />
                            </IconButton>
                        </div> */}
                        <InputBase
                            placeholder="URL check..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={e => setBarDetection({ ...barDetection, url: e.target.value })}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    if (barDetection.url) {
                                        urlInputHandler(barDetection.url)
                                    }
                                    // write your functionality here
                                }
                            }}
                            startAdornment={
                                <InputAdornment>
                                    <IconButton className={classes.searchIcon} onClick={() => barDetection.url ? urlInputHandler(barDetection.url) : null}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {/* <TextField
                            placeholder="URL check..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    console.log(e.target.value);
                                    // write your functionality here
                                }
                            }}
                            startAdornment={
                                <InputAdornment >
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        /> */}
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={1} color="secondary">
                                <MailIcon onClick={event => window.location.href = 'inbox'} />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    {/* <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div> */}
                </Toolbar>
            </MuiAppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}