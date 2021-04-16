import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/Inbox';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';

import DeleteIcon from '@material-ui/icons/Delete';
import BugReportIcon from '@material-ui/icons/BugReport';
import AddIcon from '@material-ui/icons/Add';


import EmailMainBody from '../EmailMainBody/EmailMainBody'
import EmailCompose from '../EmailCompose/EmailCompose'

import Button from '@material-ui/core/Button';

import {  Link, Route, Redirect, useRouteMatch } from 'react-router-dom';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 640,

  },
  // appBar: {
  //   zIndex: theme.zIndex.drawer + 1,
  // },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    // position: 'relative',
    borderRight: "1.5px solid rgba(0, 0, 0, 0.2)",
    zIndex: 500
  },
  drawerToggle: {
    width: 80,
    flexShrink: 0,

  },
  drawerPaperToggle: {
    width: 80,
    // position: 'relative',
    borderRight: "1.5px solid rgba(0, 0, 0, 0.2)",
    zIndex: 500
  },
  drawerContainer: {
    paddingLeft: "15px",
    overflow: "hidden"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    // height: 100,
    overflow: "auto"
  },
}));

export default function Drawer(props) {
  const classes = useStyles();

  const [toggle] = React.useState(props.toggle)

  let { path, url } = useRouteMatch();


  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      {/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <MuiDrawer
        className={toggle ? classes.drawerToggle : classes.drawer}
        variant="permanent"
        classes={{
          paper: toggle ? classes.drawerPaperToggle : classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <div style={{ paddingLeft: '16px', paddingRight: '16px', paddingTop: "10px", paddingBottom: "10px", display: 'flex', height: '3rem' }}>
              <Link to={`${url}/compose`} style={{ textDecoration: 'none', color: 'black' }}>

                <Button
                  style={{ borderRadius: '80px' }}
                  variant="contained"
                  color="default"
                  className={classes.button}
                  startIcon={<AddIcon />}
                  size="large"
                  key="compose-button"
                >
                  Compose
                </Button>
              </Link>

            </div>

            {[
              { label: 'Inbox', icon: <InboxIcon />, disabled: false },
              { label: 'Starred', icon: <StarIcon />, disabled: false },
              // { label: 'Snoozed', icon: <WatchLaterIcon />, disabled: false },
              { label: 'Sent', icon: <SendIcon />, disabled: false },
              { label: 'Drafts', icon: <DraftsIcon />, disabled: true },
            ].map((item, index) => (
              item['disabled'] ?
                (
                  <ListItem key={item['label']} button disabled={item['disabled']}>
                    <ListItemIcon>{item['icon']}</ListItemIcon>
                    <ListItemText primary={item['label']} />
                  </ListItem>
                ) :
                (
                  <Link to={`${url}/${item['label'].toLowerCase()}`} style={{ textDecoration: 'none', color: 'black' }} key={item['label']}>
                    <ListItem button disabled={item['disabled']}>
                      <ListItemIcon>{item['icon']}</ListItemIcon>
                      <ListItemText primary={item['label']} />
                    </ListItem>
                  </Link>
                )
            ))}
          </List>
          <Divider />
          <List>
            {[
              { label: 'Trash', icon: <DeleteIcon />, disabled: false },
              { label: 'Spam', icon: <BugReportIcon />, disabled: true },
            ].map((item, index) => (
              item['disabled'] ?
                (
                  <ListItem key={item['label']} button disabled={item['disabled']}>
                    <ListItemIcon>{item['icon']}</ListItemIcon>
                    <ListItemText primary={item['label']} />
                  </ListItem>
                ) :
                (
                  <Link to={`${url}/${item['label'].toLowerCase()}`} style={{ textDecoration: 'none', color: 'black' }} key={item['label']}>
                    <ListItem button disabled={item['disabled']}>
                      <ListItemIcon>{item['icon']}</ListItemIcon>
                      <ListItemText primary={item['label']} />
                    </ListItem>
                  </Link>
                )

            ))}
          </List>
        </div>
      </MuiDrawer>
      <main className={classes.content}>


        {/* <div style={{ height: "95%" }}> */}

        <Route path={`${path}/compose`}>
          <EmailCompose />
        </Route>

        <Route exact path={`${path}/inbox`}>
          <EmailMainBody label="inbox" />
        </Route>

        <Route exact path={`${path}/starred`}>
          <EmailMainBody label="starred" />
        </Route>

        <Route exact path={`${path}/sent`}>
          <EmailMainBody label="sent" />
        </Route>

        <Route exact path={`${path}/trash`}>
          <EmailMainBody label="trash" />
        </Route>

        <Redirect from="/" exact to={`${path}/inbox`} />
        {/* </div> */}




      </main>
    </div >
  );
}
