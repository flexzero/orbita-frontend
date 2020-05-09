import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockList from "./LocksList/LocksList";
import "./GroupContainer.css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import LockDataList from "../LockManagement/LockDataList/LockDataList";

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
  const [lockUser, setLockUser] = React.useState(0);

  const { locks: { locks, users } } = useSelector((state) => state);

  const handleChange = (event) => {
    setLockUser(event.target.value);
  };

  let selectedLocks = [];
  if (users && lockUser !== 0) {
    selectedLocks = [users.byId[lockUser].assignedLockId];
  } else if (users && lockUser === 0) {
    const allAssignedIds = users.allIds.map(id => users.byId[id].assignedLockId);
    selectedLocks = locks.allIds.filter(id => !allAssignedIds.includes(id));
  }


  const classes = useStyles();
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
      <Typography color="textPrimary">Dashboard</Typography>
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
                        value={lockUser}
                        onChange={handleChange}
                        label="Users"
                        size="small"
                      >
                        {users ? users.allIds.map((id, i) => <MenuItem value={id}>{`${users.byId[id].firstName} ${users.byId[id].lastName}`}</MenuItem>) : <MenuItem value={0} selected>Loading...</MenuItem>}
                        <MenuItem value={0}>Not Assigned</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <div className={classes.locksContainer}>
                  <LockList selectedLocks={selectedLocks} />
                </div>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
