import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import LockInfo from "./LockInfo/LockInfo";
import LockDataList from "./LockDataList/LockDataList";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LockManagement(props) {
  
  const {
    match: {
      params: { id:lockId }
    }
  } = props;

  const {locks: { locks }} = useSelector((state) => state)
  const lockData = locks.byId[lockId];

  const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <LinkRouter color="inherit" to="/">
          Dashboard
        </LinkRouter>
        <Typography color="textPrimary">Lock Management</Typography>
      </Breadcrumbs>
      <LockInfo {...lockData}/>
      <LockDataList lockId={parseInt(lockId)}/>
    </div>
  );
}
