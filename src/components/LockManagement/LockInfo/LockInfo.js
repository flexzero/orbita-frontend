import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import BatteryFullIcon from "@material-ui/icons/BatteryFull";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";
import "./LockInfo.css";

const styleSheet = {
  containerPaper: {
    marginTop: "32px",
    padding: "32px",
  },
  eightPxMargin: {
    marginRight: "4px",
  },
};

export default function LockInfo(props) {
  const {lockId, lockAlias, lockName, lockMac, electricQuantity } = props;
  const history = useHistory();

  const onSendPasscode = (id) => {
    return history.push(`/add-passcode/${id}`);
  }

  return (
    <div>
      <Paper elevation={3} style={styleSheet.containerPaper}>
        <Grid container>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ width: "100%" }}
          >
            <Box display="flex" flexDirection="column">
              <div>
                <h4>{lockAlias}</h4>
              </div>
              <div>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  className="lockInfoItem"
                >
                  <Box display="flex" alignItems="center">
                    <BatteryFullIcon
                      color="success"
                      style={{
                        color: green[600],
                        transform: "rotate(90deg)",
                        marginRight: "10px",
                      }}
                    />
                    <span>{electricQuantity} %</span>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Brightness1Icon
                      style={{ color: green[500], marginRight: "4px" }}
                    />{" "}
                    <span>Online</span>
                  </Box>
                  <div>
                    <span style={styleSheet.eightPxMargin}>Lock Number:</span>
                    <span>{lockName}</span>
                  </div>
                  <div>
                    <span style={styleSheet.eightPxMargin}>MAC/ID： </span>
                    <span>{lockMac}</span>
                  </div>
                </Box>
              </div>
            </Box>
            <Box display="flex" alignItems="center">
              <div>
                <Button variant="contained" color="primary" onClick={() => {onSendPasscode(lockId)}}>
                  Send Passcode
                </Button>
              </div>
            </Box>
          </Box>
        </Grid>
      </Paper>
    </div>
  );
}
