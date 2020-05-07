import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";

import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";

import Header from "../Header/Header";

import LockIcon from "@material-ui/icons/Lock";
import AddPasscode from "../AddPasscode/AddPasscode";
import Notification from "./Notification/Notification";

import LockManagement from "../LockManagement/LockManagement";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { useSelector, useDispatch } from "react-redux";
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import WifiIcon from "@material-ui/icons/Wifi";
import GroupConainer from "../GroupContainer/GroupContainer";
import { initiateServer } from "../../actions/initiateServer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    marginTop: "64px",
    flexGrow: 1,
    padding: theme.spacing(3),
    width: "100%",
  },

  toolbar: theme.mixins.toolbar,
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const { login, initServer, notifications } = useSelector((state) => state);
  const { secret_token: secretToken } = login;
  const { initialized } = initServer;
  const dispatch = useDispatch();
  const authData = {
    secretToken,
  };

  useEffect(() => {
    dispatch(initiateServer(authData));
  }, [initialized]);

  if (!secretToken) {
    return <Redirect to="/login" />;
  }

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Header></Header>
        {/* <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {["Dashboard"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {text === "Dashboard" ? <LockIcon /> : <WifiIcon />}
                </ListItemIcon>

                <ListItemText primary={text}></ListItemText>
              </ListItem>
            ))}
          </List>
        </Drawer> */}
        <main className={classes.content}>
          <Switch>
            <Route exact path="/" component={GroupConainer} />
            <Route path="/gateways" component={LockManagement} />
            <Route path="/lock/:id" component={LockManagement} />
            <Route path="/add-passcode/:id" component={AddPasscode} />
          </Switch>
        </main>
        {console.log("Notifications on main component: ", notifications)}
        {notifications.map((notif) => (
          <Notification key={notif.id} message={notif.message} severity={notif.severity} />
        ))}
        
      </div>
    </Router>
  );
}
