import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Box from "@material-ui/core/Box";
import LockList from "./LocksList/LocksList";
import "./GroupContainer.css";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    marginTop: "16px",
    marginBottom: "16px",
  },
  paper: {
    padding: theme.spacing(3),
  },
  searchInput: {
    marginRight: "20px",
    width: "240px",
  },
  locksContainer: {
    marginTop: "32px",
  },
}));

export default function GroupConainer(props) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const classes = useStyles();
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <RouterLink color="inherit" to="/">
          Dashboard
        </RouterLink>
      </Breadcrumbs>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
              <Grid container direction="column">
                <Grid item>
                  <h3>Available Locks</h3>
                </Grid>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      size="small"
                      style={{ width: "240px" }}
                    >
                      <InputLabel id="user-label">user</InputLabel>
                      <Select
                        labelId="user-select"
                        id="user-select-id"
                        value={age}
                        onChange={handleChange}
                        label="Users"
                        size="small"
                      >
                        <MenuItem value={10}>
                          flexzero.reborn@gmail.com
                        </MenuItem>
                        <MenuItem value={20} selected>
                          Netfone
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <div className={classes.locksContainer}>
                  <LockList />
                </div>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
