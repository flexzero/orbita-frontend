import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import BatteryFullIcon from "@material-ui/icons/BatteryFull";
import Button from "@material-ui/core/Button";
import { FiberManualRecord, ViewModule, VpnKey } from "@material-ui/icons";
import Skeleton from "@material-ui/lab/Skeleton";
import "./LockCard.css";
import { useHistory } from "react-router-dom";

export default function LockCard(props) {
  const { lockData, selectedRoom } = props;

  const history = useHistory();

  const { lockAlias, electricQuantity, lockId } = lockData;

  const onSendPasscode = (id) => {
    history.push(`/add-passcode/${id}`);
  };

  const onManagePasscode = (id) => {
    history.push(`/lock/${id}`);
  };

  return (
    <div>
      <Paper variant="outlined">
        <Grid container spacing={2}>
          <Grid item className="lockDataContainer">
            <Box display="flex">
             <span>{lockAlias}</span>
            </Box>
            <Box display="flex" alignItems="center">
              <BatteryFullIcon
                style={{ transform: "rotate(90deg)", marginRight: "10px" }}
              />
              <span>{electricQuantity}%</span>
            </Box>
            <Box display="flex" alignItems="center">
              <FiberManualRecord style={{ marginRight: "10px" }} />
              <span>Online</span>
            </Box>
            <Box display="flex">
              <Button
                startIcon={<VpnKey />}
                onClick={() => {
                  onSendPasscode(lockId);
                }}
              >
                Send Passcode
              </Button>
              <Button
                startIcon={<ViewModule />}
                onClick={() => {
                  onManagePasscode(lockId);
                }}
              >
                Manage
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
