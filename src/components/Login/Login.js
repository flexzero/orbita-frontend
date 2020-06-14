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
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUserAction } from "../../actions/authenticationActions";
import { withCookies, Cookies, useCookies } from "react-cookie";
import { ADD_LOGIN } from "../../actions/";
import { useEffect } from "react";
import useForm from "../useForm/useForm";
import validate from "./LoginFormValidationRules";

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

function Login(props) {
  const classes = useStyles();

  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm(goLogin, validate);

  const {
    login,
    loading: {
      loaders: { loginLoading },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies(['secretToken', 'username']);

  const { allCookies } = props;

  const { username: user, secret_token: secretToken } = login;

  useEffect(() => {
    if (allCookies.secretToken && allCookies.username) {
      dispatch({ type: ADD_LOGIN, response: { username: allCookies.username, secret_token: allCookies.secretToken } })
    }
  }, []);

 
  const [rememberMeChecked, setRememberMeChecked] = React.useState(true);

  function goLogin() {
    dispatch(loginUserAction({ username: values.username, password: values.password }));
  }


  // const handleButtonClick = (event) => {
  //   event.preventDefault();
  //   
  // };

  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  const handleOnRememberMeChange = (event) => {
    setRememberMeChecked(event.target.checked);
  }

  if (secretToken) {
    if (rememberMeChecked) {
      setCookie('secretToken', secretToken, { path: '/' });
      setCookie('username', user, { path: '/' });
    }
    return <Redirect to="/" />
  }

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
          <form onSubmit={handleSubmit} noValidate>
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
                  error={errors.username ? true : false}
                  required
                  id="username"
                  type="standard"
                  label="username"
                  name="username"
                  value={values.username || ''}
                  helperText={errors.username}
                  onChange={handleChange}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item style={styleSheet.gridMargin}>
                <TextField
                  error={errors.password ? true : false}
                  required
                  id="password"
                  type="password"
                  label="Password"
                  name="password"
                  value={values.password || ''}
                  onChange={handleChange}
                  helperText={errors.password}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item style={styleSheet.gridMargin}>
                <div className={classes.buttonWrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    disabled={loginLoading}
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
                    control={<Checkbox name="checkedRemember" checked={rememberMeChecked} onChange={handleOnRememberMeChange} />}
                    label="Remember Me"
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default withCookies(Login);
