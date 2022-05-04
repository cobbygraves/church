import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  pagination: {
    display: "flex",
    listStyle: "none",
    margin: "15px 0",
  },
  listNumbers: {
    margin: 5,
    padding: "0 5px",
    border: "0.5px solid #496A7F",
    borderRadius: "50%",
    cursor: "pointer",
    "&:hover": {
      border: "0.5px solid red",
    },
  },
});

const Pagination = ({ membersPerPage, totalMembers, paginate }) => {
  const classes = useStyles();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMembers / membersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className={classes.pagination}>
      {pageNumbers.map((number) => (
        <li key={number} className={classes.listNumbers}>
          <span onClick={() => paginate(number)}>{number}</span>
        </li>
      ))}
    </nav>
  );
};

export default Pagination;
