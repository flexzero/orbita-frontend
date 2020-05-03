import React, { useEffect } from "react";
import {useDeepCompareEffect} from "../../../utils/utils";
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
  const dispatch = useDispatch();
  const { locks } = state;
  const lockIds = locks.allIds;

  useDeepCompareEffect(() => {
    dispatch(requestLocks());
  }, [locks]);

  return (
    <Grid container spacing={2}>
      {lockIds ? (
        lockIds.map((lockId, i) => (
          <Grid item md={4} key={lockId}>
            <LockCard
              onSendPasscode={props.onSendPasscode}
              onManagePasscode={props.onManagePasscode}
              lockData={locks.byId[lockId]}
              isLoading={locksLoading}
            />
          </Grid>
        ))
      ) : (
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Skeleton height={380}/>
          </Grid>
          <Grid item md={4}>
            <Skeleton height={380}/>
          </Grid>
          <Grid item md={4}>
            <Skeleton height={380}/>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
