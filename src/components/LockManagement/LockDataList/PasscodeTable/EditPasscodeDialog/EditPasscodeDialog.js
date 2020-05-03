import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from "@material-ui/icons/Edit";

const styles = {
    operationBtnStyles: { marginLeft: "8px", marginRight: "8px" },
    passcodeInputStyle: {
        marginTop: "16px",
        marginBottom: "16px"
      },
  };
  

export default function EditPasscodeDialog(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
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
              style={styles.passcodeInputStyle}
            />
            <TextField
              required
              variant="outlined"
              size="small"
              label="Passcode"
              fullWidth
              style={styles.passcodeInputStyle}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
    
}