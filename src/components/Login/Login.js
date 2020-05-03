import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  TextField,
  Divider,
  Box,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    overflow: "hidden",
  },
  buttonWrapper: {
    position: "relative",
  },
  container: {
    height: "100vh",
    overflow: "hidden",
    marginTop: "120px",
  },
  paper: {
    maxWidth: "582px",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  buttonSuccess: {},
  buttonProgress: {
    color: indigo[900],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const styleSheet = {
  gridMargin: {
    marginLeft: ".5rem",
    marginRight: ".5rem",
  },
  noUnderline: {
    textDecoration: "none",
  },
  dashedDivider: {
    borderBottomWidth: "1px",
    borderBottomStyle: "dashed",
    backgroundColor: "transparent",
    opacity: "0.25",
  },
};

export default function Login(props) {
  const classes = useStyles();

  const {
      loading: {
        loaders: { loginLoading },
      },
  } = useSelector((state) => state);


  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleButtonClick = (event) => {
    props.handleLogin(event, { username, password });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.container}
        spacing={3}
        justify="center"
        align="center"
      >
        <Grid item xs={6}>
          <Grid item>
            <h2>Sign In</h2>
          </Grid>
          <Paper className={classes.paper} elevation={3}>
            <Grid
              container
              spacing={3}
              direction="column"
              justify="center"
              align="center"
            >
              <Grid item style={styleSheet.gridMargin}>
                <TextField
                  required
                  id="username"
                  type="standard"
                  label="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item style={styleSheet.gridMargin}>
                <TextField
                  required
                  id="password"
                  type="password"
                  label="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item style={styleSheet.gridMargin}>
                <div className={classes.buttonWrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loginLoading}
                    onClick={handleButtonClick}
                  >
                    Sign In
                  </Button>
                  {loginLoading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Grid>
              <Grid item style={styleSheet.gridMargin}>
                <Box display="flex" justifyContent="flex-start">
                  <FormControlLabel
                    control={<Checkbox name="checkedRemember" />}
                    label="Remember Me"
                  />
                </Box>
              </Grid>
              <Grid item style={styleSheet.gridMargin}>
                <Divider style={styleSheet.dashedDivider}></Divider>
              </Grid>
              <Grid item style={styleSheet.gridMargin}>
                <Box display="flex" alignItems="flex-start">
                  <a href="/forgetPassword" style={styleSheet.noUnderline}>
                    Forgot password?
                  </a>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
