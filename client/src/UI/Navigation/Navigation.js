// import React from "react";
// import "./Navigation.css";
// import NavigationItem from "../NavigationItem/NavigationItem";
// import { connect } from "react-redux";
// import { setAuthentication } from "../../Store/Actions";
// import { withRouter } from "react-router-dom";

// const styles = {
//   userAuth: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   btnStyle: {
//     position: "relative",
//     top: "-8px",
//   },
// };

// const Navigation = (props) => {
//   const logOutUser = () => {
//     props.setLogOut(null);
//     localStorage.removeItem("userDetails");
//     props.history.replace("/");
//   };

//   return (
//     <div className="Navigation pt-3">
//       <NavigationItem name="Members" link="/members" />
//       <NavigationItem name="Register" link="/member/register" />
//       {props.userAuth && (
//         <div style={styles.userAuth}>
//           {" "}
//           <p
//             onClick={logOutUser}
//             style={{
//               borderRadius: "3px",
//               padding: "10px",
//               cursor: "pointer",
//             }}
//           >
//             Logout
//           </p>
//         </div>
//       )}
//       <form className="form-inline" style={styles.btnStyle}>
//         <div className="form-group">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search By First Name"
//             aria-describedby="helpId"
//             disabled={props.isRegister}
//             onChange={props.onFindMember}
//             value={props.find}
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     userAuth: state.isUserAuth,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setLogOut: (isLogOut) => dispatch(setAuthentication(isLogOut)),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouter(Navigation));
