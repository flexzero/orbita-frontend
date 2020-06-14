import React, { useEffect } from "react";
import { useDeepCompareEffect } from "../../../utils/utils";
import Grid from "@material-ui/core/Grid";
import LockCard from "./LockCard/LockCard";
import { requestLocks } from "../../../actions/locksActions";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";


export default function LocksList(props) {
  const state = useSelector((state) => state);
  const {
    loading: {
      loaders: { locksLoading },
    },
  } = state;
  const { login: { secret_token: secretToken } } = state;
  const dispatch = useDispatch();
  const { locks: { locks, }, reservations } = state;
  const { selectedRoom } = props;
  let lockData = null;
  if(selectedRoom) {
      let selectedLockId = selectedRoom.mappedLock;
      lockData = locks.byId[selectedLockId] || {};  
  }
  console.log(lockData);
useDeepCompareEffect(() => {
    dispatch(requestLocks({ secretToken }));
  }, []);

  return (
    <Grid container spacing={2}>
      {selectedRoom ? (
        <Grid item md={4} key={selectedRoom.area_id}>
          <LockCard
            key={selectedRoom.area_id}
            onSendPasscode={props.onSendPasscode}
            onManagePasscode={props.onManagePasscode}
            lockData={lockData}
            selectedRoom={selectedRoom}
          />
        </Grid>
      )
        : (
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Skeleton height={380} />
            </Grid>
            <Grid item md={4}>
              <Skeleton height={380} />
            </Grid>
            <Grid item md={4}>
              <Skeleton height={380} />
            </Grid>
          </Grid>
        )}
    </Grid>
  );
}
