import React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { indigo } from "@material-ui/core/colors";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextFild from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { generateRandomPasscode } from "../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { addPasscode } from "../../actions/locksActions";
import { getUnixDateTime } from "../../utils/utils";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const styleSheet = {
  containerPaperStyle: {
    marginTop: "32px",
    padding: "32px",
  },
  passcodeInputStyle: {
    width: "250px",
    margin: "16px",
  },

  enterPasscodeBox: {
    margin: "32px",
  },
  buttonProgress: {
    color: indigo[900],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonWrapper: {
    position: "relative"
  }
};

export default function AddPasscode(props) {
  const classes = makeStyles();

  const [type, setType] = React.useState(10);
  const [selectedStartDate, handleStartDateChange] = useState(new Date());
  const [selectedEndDate, handleEndDateChange] = useState(new Date());
  const [passcode, setPasscode] = useState("");
  const [passcodeName, setPasscodeName] = useState("");
  const dispatch = useDispatch();

  const {
    history,
    match: {
      params: { id: lockId },
    },
  } = props;

  const { addPasscodeLoading } = useSelector(state => state.loading.loaders);

  const getRandomPasscode = () => {
    setPasscode(generateRandomPasscode());
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleOnAddClick = () => {
    dispatch(
      addPasscode({
        lockId,
        passcode,
        passcodeName,
        startDate: getUnixDateTime(selectedStartDate),
        endDate: getUnixDateTime(selectedEndDate),
        history,
      })
    );
  };

  const onChangePasscodeName = (e) => {
    setPasscodeName(e.target.value);
  };

  const onPasscodeChange = (e) => {
    setPasscode(e.target.value);
  };

  const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <LinkRouter color="inherit" to="/">
          Dashboard
        </LinkRouter>
        <Typography color="textPrimary">Add Passcode</Typography>
      </Breadcrumbs>
      <Paper elevation={3} style={styleSheet.containerPaperStyle}>
        <Grid container>
          <Grid item style={{ width: "100%" }}>
            <h3>Send Passcode</h3>
            <Box
              display="flex"
              flexDirection="column"
              style={styleSheet.enterPasscodeBox}
            >
              <div style={styleSheet.passcodeInputStyle}>Lock: Lock Name</div>
              <div>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  size="small"
                  style={styleSheet.passcodeInputStyle}
                >
                  <InputLabel id="pType-label">Passcode Type</InputLabel>
                  <Select
                    labelId="pType-label"
                    id="pType"
                    value={type}
                    onChange={handleTypeChange}
                    label="Password Type"
                  >
                    <MenuItem value={10} selected>
                      Timely
                    </MenuItem>
                    <MenuItem value={20} disabled>
                      Parmanent
                    </MenuItem>
                    <MenuItem value={30} disabled>
                      Recurring
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    style={styleSheet.passcodeInputStyle}
                    autoOk
                    required
                    variant="inline"
                    inputVariant="outlined"
                    label="Start Date"
                    format="MM/dd/yyyy HH:mm"
                    size="small"
                    value={selectedStartDate}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(date) => handleStartDateChange(date)}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    style={styleSheet.passcodeInputStyle}
                    autoOk
                    required
                    variant="inline"
                    inputVariant="outlined"
                    label="End Date"
                    format="MM/dd/yyyy HH:mm"
                    size="small"
                    value={selectedEndDate}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(date) => handleEndDateChange(date)}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div>
                <TextFild
                  required
                  variant="outlined"
                  size="small"
                  label="Passcode Name"
                  value={passcodeName}
                  onChange={onChangePasscodeName}
                  style={styleSheet.passcodeInputStyle}
                ></TextFild>
              </div>
              <Box display="flex" alignItems="center">
                <div>
                  <TextFild
                    required
                    variant="outlined"
                    size="small"
                    label="Passcode"
                    value={passcode}
                    onChange={onPasscodeChange}
                    style={styleSheet.passcodeInputStyle}
                  ></TextFild>
                </div>
                <div>
                  <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    disabled={addPasscodeLoading}
                    onClick={getRandomPasscode}
                  >
                    Generate
                  </Button>
                </div>
              </Box>
              <div style={styleSheet.buttonWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "16px" }}
                  disabled={addPasscodeLoading}
                  onClick={handleOnAddClick}
                >
                  Add Passcode
                  {addPasscodeLoading && (
                    <CircularProgress
                      size={24}
                      style={styleSheet.buttonProgress} />
                  )}
                </Button>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
