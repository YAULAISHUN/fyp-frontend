import React, { useState, useEffect } from 'react';

import './App.css';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from './components/AppBar/AppBar'
import SideBar from './components/Drawer/Drawer'
import { Toolbar } from '@material-ui/core';

import Login from './components/Auth/Login'
import Fade from '@material-ui/core/Fade';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import gmailApi from "./controllers/GmailAPI/GmailAPI";

const useStyles = makeStyles((theme) => ({
  mainBody: {
    marginTop: '100px'
  }
}));

export default function App(props) {
  // const classes = useStyles();

  const [signIn, setSignIn] = useState(gmailApi.sign);
  const [toggleDrawer, setToggleDrawer] = useState(false);

  useEffect(() => {
    // window.location.reload()
    gmailApi.listenSign(signIn => {
      setSignIn(signIn)
      localStorage.setItem('isLoggedIn', JSON.stringify(signIn))
    });

  }, []);

  const handleToggle = () => {
    const toggle = toggleDrawer;
    setToggleDrawer(!toggle);
    console.log('hhh')
  }

  const PrivateRoute = ({ children, ...rest }) => {
    const isAuth = JSON.parse(localStorage.getItem('isLoggedIn'));
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuth ?
            (children) :
            <Redirect exact to={{ pathname: "/", state: { from: location } }} />
        }
      />
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/">
            <div>hh</div>
          </Route> */}
          <Route path="/login">
            <Fade in timeout={2000}>
              <div>
                <Login />
              </div>
            </Fade>
          </Route>
          <PrivateRoute path="/dashboard">
            <AppBar toggleEvent={handleToggle} />
            <Toolbar />
            <SideBar toggle={toggleDrawer} />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>


    </div>
  );
}
