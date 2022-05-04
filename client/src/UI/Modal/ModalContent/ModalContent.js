import React from "react";
import "./ModalContent.css";
import MemberDetails from "../../../Members/MemberDetails/MemberDetails";

const ModalContent = (props) => {
  if (props.details) {
    return (
      <div className="Modal-Content">
        <MemberDetails
          details={props.memberDetails}
          closeModal={props.modalClose}
        />
      </div>
    );
  }
};

export default ModalContent;
