import './App.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import AppBar from './components/appBar/appBar'
import SideBar from './components/sideBar/sideBar'
import Dialog from './components/Dialog/Dialog'
import { Toolbar } from '@material-ui/core';
// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   drawerContainer: {
//     overflow: 'auto',
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));

const useStyles =  makeStyles((theme) => ({
  mainBody: {
    marginTop: '100px'
  }
}));

export default function App(props) {
  const classes = useStyles();

  return (
    <div className="App">
        <AppBar />
        {/* <div className={classes.mainBody}>
          <SideBar />
        </div> */}
        <Toolbar />
        <SideBar />
    </div>
  );
}
