import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import PasscodeTable from "./PasscodeTable/PasscodeTable";
import { requestPasscodes } from "../../../actions/locksActions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecordsTable from "./RecordsTable/RecordsTable";
import { useDeepCompareEffect, isObjectEmpty } from "../../../utils/utils";

const styleSheet = {
  containerPaperStyle: {
    marginTop: "32px",
    padding: "32px",
  },
};

export default function LockDataList(props) {
  const passcodes = useSelector((state) => state.passcodes);
  const { allIds } = passcodes;
  const [selectedList, setSelectedList] = useState("passcodes");
  const dispatch = useDispatch();
  let passcodesArr = [];
  const { lockId } = props;

  if (!isObjectEmpty(passcodes)) {
    passcodesArr = allIds.filter((id) => {
      if (passcodes.byId[id] !== undefined) {
        return passcodes.byId[id].lockId === lockId;
      }
    })
      .map((id) => passcodes.byId[id]);
  }
  useDeepCompareEffect(() => {
    dispatch(requestPasscodes());
  }, [allIds]);

  return (
    <div>
      <Paper elevation={3} style={styleSheet.containerPaperStyle}>
        <Grid container>
          <Grid item>
            <ButtonGroup
              style={{ marginBottom: "16px" }}
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() => {
                  setSelectedList("passcodes");
                }}
                disabled={selectedList === "passcodes"}
              >
                Passcodes
              </Button>
              <Button
                onClick={() => {
                  setSelectedList("records");
                }}
                disabled={selectedList === "records"}
              >
                Records
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item style={{ width: "100%" }}>
            {selectedList === "passcodes" ? (
              <PasscodeTable passcodes={passcodesArr} lockId={lockId} />
            ) : (
                <RecordsTable lockId={lockId} />
              )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
