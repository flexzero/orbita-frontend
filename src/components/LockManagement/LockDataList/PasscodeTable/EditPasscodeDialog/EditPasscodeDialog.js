import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from "@material-ui/icons/Edit";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch, useSelector } from "react-redux";
import { editPasscode } from "../../../../../actions/locksActions";

const styles = {
  operationBtnStyles: { marginLeft: "8px", marginRight: "8px" },
  passcodeInputStyle: {
    marginTop: "16px",
    marginBottom: "16px"
  },
  passcodeInputStyle: {
    width: "250px",
    margin: "16px",
  },
};


export default function EditPasscodeDialog(props) {

  const { passcodeId: keyboardPwdId, passcodeName: keyboardPwdName, passcode: keyboardPwd, startDate, endDate, lockId } = props;
  const { login: { secret_token: secretToken } } = useSelector(state => state);

  const [open, setOpen] = React.useState(false);
  const [selectedStartDate, handleStartDateChange] = useState(new Date(startDate));
  const [selectedEndDate, handleEndDateChange] = useState(new Date(endDate === "Permanent" ? 0 : endDate));
  const [passcode, setPasscode] = useState(keyboardPwd);
  const [passcodeName, setPasscodeName] = useState(keyboardPwdName);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const onPasscodeChange = (e) => {
    setPasscode(e.target.value);
  }

  const onPasscodeNameChange = (e) => {
    setPasscodeName(e.target.value);
  }

  const onEditClick = () => {
    dispatch(editPasscode({
      lockId,
      keyboardPwdId,
      passcodeName,
      passcode,
      selectedStartDate,
      selectedEndDate,
      secretToken,
    }));
    setOpen(false);
  }

  return (
    <div>
      <Button variant="contained" size="small" style={styles.operationBtnStyles} color="primary" startIcon={<EditIcon />} onClick={handleClickOpen}>
        Edit
        </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Passcode</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can change the name and actual passcode here
            </DialogContentText>
          <TextField
            required
            variant="outlined"
            size="small"
            label="Passcode Name"
            fullWidth
            value={passcodeName}
            onChange={onPasscodeNameChange}
            style={styles.passcodeInputStyle}
            disabled
          />
          <TextField
            required
            variant="outlined"
            size="small"
            label="Passcode"
            value={passcode}
            fullWidth
            style={styles.passcodeInputStyle}
            onChange={onPasscodeChange}
          />
          {endDate !== "Permanent" ? <div> <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                style={styles.passcodeInputStyle}
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
                  style={styles.passcodeInputStyle}
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
            </div></div> : <div></div>}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
          <Button onClick={onEditClick} color="primary">
            Edit
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  )

}