import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import BookIcon from "@material-ui/icons/Book";
import "./PasscodeTable.css";
import { epochToDate } from "../../../../utils/utils";
import EditPasscodeDialog from "./EditPasscodeDialog/EditPasscodeDialog";
import DeletePasscodeDialog from "./DeletePasscodeDialog/DeletePasscodeDialog";

function createData(
  id,
  name,
  passcode,
  assigner,
  assigndate,
  startDate,
  validity,
  status,
  operation
) {
  return {
    id,
    name,
    passcode,
    assigner,
    assigndate,
    startDate,
    validity,
    status,
    operation,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "passcode", numeric: true, disablePadding: false, label: "Passcode" },
  { id: "assigner", numeric: true, disablePadding: false, label: "Assigner" },
  {
    id: "assigntime",
    numeric: true,
    disablePadding: false,
    label: "Assigning time",
  },
  {
    id: "startdate",
    numeric: true,
    disablePadding: false,
    label: "Start Date",
  },
  {
    id: "validityperiod",
    numeric: true,
    disablePadding: false,
    label: "Validity Period",
  },
  { id: "status", numeric: true, disablePadding: false, label: "Status" },
  { id: "operation", numeric: true, disablePadding: false, label: "Operation" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ textAlign: "center" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Passcode Data
      </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const styles = {
  operationBtnStyles: { marginLeft: "8px", marginRight: "8px" },
};

export default function PasscodeTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const selected = [];
  const dense = false;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { passcodes } = props;

  const rows = [
    ...passcodes.map((passcode) =>
      createData(
        passcode.keyboardPwdId,
        passcode.keyboardPwdName || "No Name",
        passcode.keyboardPwd,
        passcode.recieverUsername || "Admin",
        epochToDate(passcode.sendDate),
        epochToDate(passcode.startDate),
        passcode.endDate ? epochToDate(passcode.endDate) : "Permenant",
        passcode.status
      )
    ),
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.name}>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.passcode}</TableCell>
                      <TableCell align="center">{row.assigner}</TableCell>
                      <TableCell align="center">{row.assigndate}</TableCell>
                      <TableCell align="center">{row.startDate}</TableCell>
                      <TableCell align="center">{row.validity}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell>
                        <Box display="flex" justifyContent="center">
                          <EditPasscodeDialog
                            passcodeId={row.id}
                            lockId={props.lockId}
                          />
                          <DeletePasscodeDialog
                            passcodeId={row.id}
                            lockId={props.lockId}
                          />
                          <Button
                            size="small"
                            variant="contained"
                            style={styles.operationBtnStyles}
                            color="green"
                            startIcon={<BookIcon />}
                          >
                            Logs
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
