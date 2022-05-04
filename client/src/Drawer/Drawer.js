import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import logo from "../Assets/LHI.jpg";
import "./Drawer.css";

import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";

import Menu from "@material-ui/icons/Menu";

const useStyles = makeStyles({
  list: {
    width: 250,
    backgroundColor: "black",
    color: "white",
  },
  fullList: {
    width: "auto",
  },
  drawer: {
    "& .MuiDrawer-paperAnchorLeft ": {
      backgroundColor: "black",
    },
  },
  listItem: {
    padding: "15px 0",
    borderBottom: "0.5px solid white",
    textAlign: "center",
  },
});

const Drawer = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ left: open });
  };

  const list = () => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: "left" === "top" || "left" === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={logo}
            alt="logo"
            height={150}
            width={150}
            style={{ borderRadius: "50%", marginBottom: 10 }}
          />
        </div>
        <ListItem
          button
          className={classes.listItem}
          style={{ borderTop: "0.5px solid white" }}
          onClick={props.membersPage}
        >
          <ListItemText primary="MEMBERS" />
        </ListItem>

        <ListItem
          button
          className={classes.listItem}
          onClick={props.registerPage}
        >
          <ListItemText primary="REGISTER" />
        </ListItem>

        <ListItem button className={classes.listItem} onClick={props.logout}>
          <ListItemText primary="LOGOUT" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <Menu onClick={toggleDrawer(true)} />

        <SwipeableDrawer
          className={classes.drawer}
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default Drawer;
