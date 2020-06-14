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
import ReservationsTable from "../GroupContainer/ReservationsTable/ReservationsTable";
import CircularProgress from "@material-ui/core/CircularProgress";
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
  const [sRoom, setRoom] = React.useState(0);

  const { locks: { locks }, reservations, loading: { loaders: { locksLoading, getReservationsLoading } } } = useSelector((state) => state);

  const handleChange = (event) => {
    setRoom(event.target.value);
  };

  let selectedRoom = null;
  if (reservations) {
    selectedRoom = reservations[sRoom]
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
                    {(locksLoading || getReservationsLoading) ? <CircularProgress /> : <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      size="small"
                      style={{ width: "240px" }}
                    >
                      <InputLabel id="user-label">user</InputLabel>
                      <Select
                        labelId="user-select"
                        id="user-select-id"
                        value={sRoom}
                        onChange={handleChange}
                        label="Users"
                        size="small"
                      >
                        {reservations ? reservations.map((res, i) => <MenuItem value={i} key={i}>{`${res.area}`}</MenuItem>) : <MenuItem value={555} selected>Loading...</MenuItem>}
                      </Select>
                    </FormControl>}
                  </Box>
                </Box>
                <div className={classes.locksContainer}>
                  <LockList selectedRoom={selectedRoom} />
                </div>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <div>
      </div>
      <ReservationsTable />
    </div>
  );
}
