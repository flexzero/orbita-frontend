import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deletePasscode } from "../../../../../actions/locksActions";
import { indigo } from "@material-ui/core/colors";
import { CircularProgress } from "@material-ui/core";

const styles = {
  operationBtnStyles: { marginLeft: "8px", marginRight: "8px" },
  buttonWrapper: { position: "relative" },
  buttonProgress: {
    color: indigo[900],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
};

export default function DeletePasscodeDialog(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const { lockId, passcodeId } = props;

  const { deletingPasscodeId } = useSelector((state) => state.passcodes);
  const { deletePasscodeLoading } = useSelector(
    (state) => state.loading.loaders
  );

  const isDeleting = () => {
    return passcodeId === deletingPasscodeId;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deletePasscode({ lockId, passcodeId }));
    setOpen(false);
  };

  return (
    <div>
      <div style={styles.buttonWrapper}>
        <Button
          variant="contained"
          size="small"
          style={styles.operationBtnStyles}
          color="secondary"
          startIcon={<DeleteIcon />}
          disabled={isDeleting()}
          onClick={handleClickOpen}
        >
          Delete
          {deletePasscodeLoading && isDeleting() && (
            <CircularProgress size={24} style={styles.buttonProgress} />
          )}
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Passcode</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this passcode?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
