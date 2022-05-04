import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import DropDownIcon from "@material-ui/icons/ArrowDropDown";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mobileMenu: {
    marginLeft: 5,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

const MobileMenu = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <span className={classes.mobileMenu}>
      <IconButton
        aria-label="delete"
        size="small"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <DropDownIcon color="primary" size="large" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            props.viewDetails();
          }}
        >
          view
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            props.updateDetails();
          }}
        >
          update
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            props.deleteDetails();
          }}
          disabled={props.isMember}
        >
          delete
        </MenuItem>
      </Menu>
    </span>
  );
};

export default MobileMenu;
