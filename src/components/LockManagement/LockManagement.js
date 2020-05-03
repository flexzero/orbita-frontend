import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import LockInfo from "./LockInfo/LockInfo";
import LockDataList from "./LockDataList/LockDataList";
import { Link as RouterLink } from "react-router-dom";

export default function LockManagement(props) {
  const {
    location: {
      state: { lockData },
    },
  } = props;
  const { lockId } = lockData;

  console.log(lockData);
  
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <RouterLink color="inherit" to="/">
          Dashboard
        </RouterLink>
        <Typography color="textPrimary">Lock Management</Typography>
      </Breadcrumbs>
      <LockInfo {...lockData}/>
      <LockDataList lockId={lockId}/>
    </div>
  );
}
