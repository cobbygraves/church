// import React from 'react';
// import './NavigationBar.css';

// const NavigationBar = (props) => {
//   return <div className='NavigationBar'>{props.children}</div>;
// };

// export default NavigationBar;

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
// import SearchIcon from "@material-ui/icons/Search";

//import statement from Navigation
import { withRouter, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../../Store/ActionCreators";
import logo from "../../Assets/LHI.jpg";
import Drawer from "../../Drawer/Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    flexGrow: 1,
    "& .MuiAppBar-root": {
      backgroundColor: "black",
    },

    "& .MuiSvgIcon-root": {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },

    "& img": {
      position: "relative",
      left: -10,
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  buttonActions: {
    color: "white",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    // position: "absolute",
    // right: 15,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      width: "75%",
    },
  },
  // searchIcon: {
  //   padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "relative",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const NavigationBar = (props) => {
  const history = useHistory();
  const isLogin = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const { userAuthentication } = bindActionCreators(ActionCreators, dispatch);

  const logOutUser = () => {
    userAuthentication(false);
    localStorage.removeItem("userData");
    props.history.replace("/");
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Drawer
              logout={logOutUser}
              membersPage={() => props.history.push("/members")}
              registerPage={() => props.history.push("/member/register")}
            />
            <img
              src={logo}
              alt="logo"
              height={45}
              width={45}
              style={{ borderRadius: "50%" }}
            />
          </IconButton>
          <div style={{ flexGrow: 1 }}></div>
          {/* <NavLink to="/members"> */}
          <Button
            variant="outlined"
            className={classes.buttonActions}
            onClick={() => history.push("/members")}
          >
            {" "}
            Members
          </Button>

          {/* <NavLink to="/member/register"> */}
          <Button
            variant="outlined"
            className={classes.buttonActions}
            onClick={() => history.push("/member/register")}
          >
            {" "}
            Register
          </Button>

          {isLogin && (
            <Button
              className={classes.buttonActions}
              onClick={logOutUser}
              variant="outlined"
            >
              LogOut
            </Button>
          )}
          <div className={classes.search}>
            {/* <div className={classes.searchIcon}>
              <SearchIcon />
            </div> */}
            <InputBase
              placeholder="Search By First Name"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              disabled={props.isRegister}
              onChange={props.onFindMember}
              value={props.find}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(NavigationBar);
