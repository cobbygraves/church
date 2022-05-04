import React, { useRef } from "react";
import "./MemberDetails.css";
import { Fab } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    left: "50%",
    top: "50%",
  },
  captions: {
    fontWeight: "bold",
  },
  nameSpan: {
    marginRight: 5,
  },
}));

const MemberDetails = (props) => {
  const classes = useStyles();
  const memberRef = useRef(null);

  return (
    <div className="MemberDetails" ref={memberRef}>
      <div className="Display-Profile">
        <img
          // src={`http://localhost:5000/images/${props.details.pic}`}
          src={`https://loyaltyhouse.herokuapp.com/images/${props.details.pic}`}
          alt=""
        />
      </div>
      <p>
        <span className={classes.captions}>NAME: </span>
        <span className={classes.nameSpan}>{props.details.first}</span>
        <span className={classes.nameSpan}>{props.details.other}</span>
        <span className={classes.nameSpan}>{props.details.last}</span>
      </p>
      <p>
        <span className={classes.captions}>EMAIL: </span>
        <span>{props.details.email}</span>
      </p>
      <p>
        <span className={classes.captions}>DATE OF BIRTH: </span>
        <span>{props.details.birth}</span>
      </p>
      <p>
        <span className={classes.captions}>TELEPHONE: </span>
        <span>{props.details.telephone}</span>
      </p>
      <p>
        <span className={classes.captions}>LOCATION: </span>
        <span>{props.details.location}</span>
      </p>
      <p>
        <span className={classes.captions}>BRANCH: </span>
        <span>{props.details.branch}</span>
      </p>
      <p>
        <span className={classes.captions}>BACENTA: </span>
        <span>{props.details.bacenta}</span>
      </p>
      <p>
        <span className={classes.captions}>FELLOWSHIP: </span>
        <span>{props.details.fellowship}</span>
      </p>
      <p>
        <span className={classes.captions}>MINISTRY: </span>
        <span>{props.details.ministry}</span>
      </p>
      <p>
        <span className={classes.captions}>NAME OF SHEPHERD: </span>
        <span>{props.details.shepherd}</span>
      </p>
      <p>
        <span className={classes.captions}>NAME OF RELATION: </span>
        <span>{props.details.relation}</span>
      </p>
      <p>
        <span className={classes.captions}>CONTACT OF RELATION: </span>
        <span>{props.details.relationContact}</span>
      </p>
      <Fab
        size="small"
        className={classes.closeButton}
        color="secondary"
        onClick={props.closeModal}
        aria-label="close"
        component={motion.button}
        drag
        dragConstraints={memberRef}
      >
        <CloseIcon />
      </Fab>
    </div>
  );
};

export default MemberDetails;
