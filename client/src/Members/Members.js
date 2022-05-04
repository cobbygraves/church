import React, { useEffect, useCallback, useState } from "react";
import "./Members.css";
import Member from "./Member/Member";
import NavigationBar from "../UI/NavigationBar/NavigationBar";
// import Navigation from "../UI/Navigation/Navigation";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import logo from "../Assets/LHI.jpg";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ModalContent from "../UI/Modal/ModalContent/ModalContent";
import { withRouter, useHistory } from "react-router-dom";
import Modal from "../UI/Modal/Modal";
import { CSSTransition } from "react-transition-group";
import Pagination from "../Pagination/Pagination";
import axiosInstance from "../config";
import { Container, Card } from "@material-ui/core";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as actionCreators from "../Store/ActionCreators";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 250,
    "& .MuiTableCell-head": {
      backgroundColor: "#496a7f",
    },
  },
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
    fontWeight: "bold",
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const Members = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { showSnackBar } = bindActionCreators(actionCreators, dispatch);

  const [lookFor, setLookFor] = useState("");
  const [membersArray, setmembersArray] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [memberDetails, setMemberDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(7);
  const [userAdmin, setUserAdmin] = useState(false);

  const updateHandler = (id) => {
    props.history.push(`/member/update/${id}`);
  };
  const deleteHandler = (id) => {
    axiosInstance
      .delete(`/member/${id}`, {
        headers: {
          authorization:
            "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
        },
      })
      .then((res) => {
        const newValue = membersArray.filter((member) => member.id !== id);
        setmembersArray(newValue);
        showSnackBar(true, "member deleted", "warning");
      })
      .catch((err) => {
        showSnackBar(true, "error deleting member", "error");
        console.log(err);
      });
  };
  const viewHandler = (member) => {
    setShowDetails(true);
    setMemberDetails(member);
  };

  const showMembers = useCallback(() => {
    if (JSON.parse(localStorage.getItem("userData")).status === "member") {
      setUserAdmin(true);
    }

    axiosInstance
      .get(`members/`)
      .then((res) => setmembersArray(res.data))
      .catch((err) => console.log(err));
  }, []);

  const toggleModalHandler = () => {
    setShowDetails(false);
  };

  useEffect(() => {
    showMembers();
  }, [showMembers]);

  //implementing pagination
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = membersArray.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const paginateHandler = (nbr) => {
    setCurrentPage(nbr);
  };

  return (
    <div>
      {showDetails && (
        <React.Fragment>
          {" "}
          <CSSTransition
            appear
            in={showDetails}
            timeout={500}
            unmountOnExit
            classNames="fadeDown"
          >
            <ModalContent
              details={showDetails}
              memberDetails={memberDetails}
              modalClose={toggleModalHandler}
            />
          </CSSTransition>
          <Modal show={showDetails} toggleModal={toggleModalHandler}></Modal>
        </React.Fragment>
      )}
      <NavigationBar
        find={lookFor}
        onFindMember={(event) => {
          setLookFor(event.target.value);
        }}
      >
        <img src={logo} alt="logo" onClick={() => history.push("/members")} />
      </NavigationBar>
      <Container>
        {membersArray.length !== 0 ? (
          <Card style={{ marginTop: 25 }}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>FIRST</StyledTableCell>
                  <StyledTableCell align="right">MIDDLE</StyledTableCell>
                  <StyledTableCell align="right">LAST</StyledTableCell>
                  <StyledTableCell
                    colSpan={3}
                    align="center"
                    className={classes.actions}
                  >
                    ACTIONS
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {membersArray.length !== 0 &&
                  currentMembers
                    .filter((member) => {
                      if (lookFor === "") {
                        return member;
                      } else if (
                        member.first
                          .toLowerCase()
                          .includes(lookFor.toLowerCase())
                      ) {
                        return member;
                      }
                    })
                    .map((mbr) => (
                      <Member
                        key={mbr.id}
                        first={mbr.first}
                        other={mbr.other}
                        last={mbr.last}
                        value={membersArray}
                        onChangeValue={setMemberDetails}
                        onUpdate={() => updateHandler(mbr.id)}
                        onDelete={() => deleteHandler(mbr.id)}
                        onView={() => viewHandler(mbr)}
                        isMember={userAdmin}
                      />
                    ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <h3 className="text-center">No records found</h3>
        )}
        <Pagination
          membersPerPage={membersPerPage}
          totalMembers={membersArray.length}
          paginate={paginateHandler}
        />
      </Container>
    </div>
  );
};

export default withRouter(Members);
