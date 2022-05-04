// import React from "react";
// import "./Member.css";

import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import MobileMenu from "../../MobileMenu/MobileMenu";

const useStyles = makeStyles((theme) => ({
  actions: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Member = ({
  first,
  last,
  other,
  onUpdate,
  onDelete,
  onView,
  isMember,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <StyledTableRow>
        <StyledTableCell component="th" scope="row">
          {first}
        </StyledTableCell>
        <StyledTableCell align="right">{other}</StyledTableCell>
        <StyledTableCell align="right">
          {last}
          <MobileMenu
            viewDetails={onView}
            updateDetails={onUpdate}
            deleteDetails={onDelete}
            isMember={isMember}
          />
        </StyledTableCell>
        <StyledTableCell align="right" className={classes.actions}>
          {" "}
          <Button
            onClick={onView}
            variant="outlined"
            size="small"
            color="primary"
          >
            view
          </Button>
        </StyledTableCell>
        <StyledTableCell align="right" className={classes.actions}>
          {" "}
          <Button onClick={onUpdate} variant="outlined" size="small">
            update
          </Button>
        </StyledTableCell>
        <StyledTableCell align="right" className={classes.actions}>
          {" "}
          <Button
            onClick={onDelete}
            disabled={isMember}
            variant="outlined"
            size="small"
            color="secondary"
          >
            delete
          </Button>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
};

export default Member;
