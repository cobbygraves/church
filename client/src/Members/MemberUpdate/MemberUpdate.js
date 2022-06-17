import React, { useRef, useState, useEffect, useCallback } from "react";
// import classes from "./MemberUpdate.module.css";
import NavigationBar from "../../UI/NavigationBar/NavigationBar";
// import Navigation from "../../UI/Navigation/Navigation";
import logo from "../../Assets/LHI.jpg";
import TextField from "@material-ui/core/TextField";
import { NavLink } from "react-router-dom";
import InputGroup from "../../UI/InputGroup/InputGroup";
import Camera from "@material-ui/icons/Camera";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axiosInstance from "../../config";
import { Container } from "@material-ui/core";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as actionCreators from "../../Store/ActionCreators";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      marginBottom: 25,
    },
  },
}));

const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  var re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const MemberUpdate = (props) => {
  const muiClasses = useStyles();
  const imageRef = useRef();
  const id = props.match.params.id;

  const dispatch = useDispatch();
  const { showSnackBar } = bindActionCreators(actionCreators, dispatch);

  const [isFormValid, setIsFormValid] = useState(false);
  const [imageURL, setImageURL] = useState("");
  // const [updateSuccessful, setUpdateSuccessful] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isValidImage, setIsValidImage] = useState(false);

  //form data states
  const [firstName, setFirstName] = useState("");
  const [isTouchedFirstName, setIstouchedFirstName] = useState(false);
  const [lastName, setLastName] = useState("");
  const [isTouchedLastName, setIstouchedLastName] = useState(false);
  const [otherNames, setOtherNames] = useState("");
  const [isTouchedOtherNames, setIstouchedOtherNames] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isTouchedPhoneNumber, setIstouchedPhoneNumber] = useState(false);
  const [email, setEmail] = useState("");
  const [isTouchedEmail, setIstouchedEmail] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isTouchedDateOfBirth, setIstouchedDateOfBirth] = useState(false);
  const [location, setLocation] = useState("");
  const [isTouchedLocation, setIstouchedLocation] = useState(false);
  const [bacenta, setBacenta] = useState("");
  const [isTouchedBacenta, setIstouchedBacenta] = useState(false);
  const [fellowship, setFellowship] = useState("");
  const [isTouchedFellowship, setIstouchedFellowship] = useState(false);
  const [ministry, setMinistry] = useState("");
  const [isTouchedMinistry, setIstouchedMinistry] = useState(false);
  const [branch, setBranch] = useState("");
  const [isTouchedBranch, setIstouchedBranch] = useState(false);
  const [nameOfShepherd, setNameOfShepherd] = useState("");
  const [isTouchedNameOfShepherd, setIstouchedNameOfShepherd] = useState(false);
  const [nameOfRelation, setNameOfRelation] = useState("");
  const [isTouchedNameOfRelation, setIstouchedNameOfRelation] = useState(false);
  const [contactOfRelation, setContactOfRelation] = useState("");
  const [isTouchedContactOfRelation, setIstouchedContactOfRelation] =
    useState(false);
  //form data states

  //update member effect
  const showMemberDetails = useCallback(() => {
    axiosInstance
      .get(`member/${id}`)
      .then((res) => {
        const {
          bacenta,
          birth,
          branch,
          email,
          fellowship,
          first,
          last,
          location,
          ministry,
          other,
          pic,
          relation,
          relationContact,
          shepherd,
          telephone,
        } = res.data;

        setIsValidImage(true);
        setBacenta(bacenta);
        setDateOfBirth(birth);
        setBranch(branch);
        setEmail(email);
        setFellowship(fellowship);
        setFirstName(first);
        setLastName(last);
        setLocation(location);
        setMinistry(ministry);
        setOtherNames(other);
        setNameOfRelation(relation);
        setContactOfRelation(relationContact);
        setNameOfShepherd(shepherd);
        setPhoneNumber(telephone);
        setImageURL(`http://localhost:5000/images/${pic}`);
        // setImageURL(`https://loyaltyhouse.herokuapp.com/images/${pic}`);
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    showMemberDetails();
  }, [showMemberDetails, id]);

  useEffect(() => {
    let validMail = false;
    if (email !== "") {
      validMail = validateEmail(email);
    } else {
      validMail = true;
    }

    if (
      validMail &&
      firstName !== "" &&
      lastName !== "" &&
      branch !== "" &&
      nameOfShepherd !== ""
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    bacenta,
    branch,
    contactOfRelation,
    dateOfBirth,
    email,
    fellowship,
    firstName,
    isValidImage,
    lastName,
    location,
    ministry,
    nameOfRelation,
    nameOfShepherd,
    phoneNumber,
  ]);

  const updateMemberHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (imageFile) {
      formData.append("imageFile", imageFile[0]); // appending form data
    }

    if (isTouchedFirstName) {
      formData.append("first", firstName);
    }

    if (isTouchedLastName) {
      formData.append("last", lastName);
    }

    if (isTouchedOtherNames) {
      formData.append("other", otherNames);
    }

    if (isTouchedEmail) {
      formData.append("email", email);
    }
    if (isTouchedDateOfBirth) {
      formData.append("birth", dateOfBirth);
    }
    if (isTouchedPhoneNumber) {
      formData.append("telephone", phoneNumber);
    }
    if (isTouchedLocation) {
      formData.append("location", location);
    }

    if (isTouchedBranch) {
      formData.append("branch", branch);
    }
    if (isTouchedBacenta) {
      formData.append("bacenta", bacenta);
    }
    if (isTouchedFellowship) {
      formData.append("fellowship", fellowship);
    }

    if (isTouchedMinistry) {
      formData.append("ministry", ministry);
    }
    if (isTouchedNameOfShepherd) {
      formData.append("shepherd", nameOfShepherd);
    }

    if (isTouchedNameOfRelation) {
      formData.append("relation", nameOfRelation);
    }
    if (isTouchedContactOfRelation) {
      formData.append("relationContact", contactOfRelation);
    }

    axiosInstance
      .patch(`member/${id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          authorization:
            "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
        },
      })
      .then((res) => {
        showSnackBar(true, "member updated", "info");
        setImageURL(null);
        setBacenta("");
        setIstouchedBacenta(false);
        setBranch("");
        setIstouchedBranch(false);
        setContactOfRelation("");
        setIstouchedContactOfRelation(false);
        setPhoneNumber("");
        setIstouchedPhoneNumber(false);
        setFellowship("");
        setIstouchedFellowship(false);
        setEmail("");
        setIstouchedEmail(false);
        setNameOfShepherd("");
        setIstouchedNameOfShepherd(false);
        setNameOfRelation("");
        setIstouchedNameOfRelation(true);
        setMinistry("");
        setIstouchedMinistry(false);
        setOtherNames("");
        setIstouchedOtherNames(false);
        setFirstName("");
        setIstouchedFirstName(false);
        setLastName("");
        setIstouchedLastName(false);
        setDateOfBirth("");
        setIstouchedDateOfBirth(false);
        setLocation("");
        setIstouchedLocation(false);
        setIsValidImage(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeImageHandler = (event) => {
    if (event.target.files.length >= 1) {
      const imgFile = event.target.files[0];

      setImageFile(event.target.files);
      setIsValidImage(true);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imgFile);
      fileReader.onload = () => {
        setImageURL(fileReader.result);
      };
    } else {
      setIsValidImage(false);
    }
  };

  const imagePickerHandler = () => {
    imageRef.current.click();
  };

  return (
    <div className="Register">
      <NavigationBar isRegister>
        <NavLink to="/member/register">
          <img src={logo} alt="logo" />
        </NavLink>
        {/* <Navigation /> */}
      </NavigationBar>
      <Container>
        <form className="Register-Form" onSubmit={updateMemberHandler}>
          <div className="DisplayImage">
            <h1>UPDATE MEMBER</h1>
            <img src={imageURL} alt="" />
            <p
              onClick={imagePickerHandler}
              style={{ color: "#ccc", cursor: "pointer", marginBottom: "35px" }}
            >
              <Camera />
            </p>
          </div>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            name="image"
            style={{ display: "none" }}
            ref={imageRef}
            onChange={changeImageHandler}
          />
          <InputGroup>
            <TextField
              className={muiClasses.margin}
              placeholder="First Name"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
                setIstouchedFirstName(true);
              }}
            />

            <TextField
              className={muiClasses.margin}
              placeholder="Last Name"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
                setIstouchedLastName(true);
              }}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              className={muiClasses.margin}
              placeholder="Other Names"
              value={otherNames}
              onChange={(event) => {
                setOtherNames(event.target.value);
                setIstouchedOtherNames(true);
              }}
            />

            <TextField
              className={muiClasses.margin}
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(event) => {
                setPhoneNumber(event.target.value);
                setIstouchedPhoneNumber(true);
              }}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              className={muiClasses.margin}
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setIstouchedEmail(true);
              }}
            />

            <TextField
              className={muiClasses.margin}
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={(event) => {
                setDateOfBirth(event.target.value);
                setIstouchedDateOfBirth(true);
              }}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              className={muiClasses.margin}
              placeholder="Location"
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
                setIstouchedLocation(true);
              }}
            />

            <TextField
              className={muiClasses.margin}
              placeholder="Bacenta"
              value={bacenta}
              onChange={(event) => {
                setBacenta(event.target.value);
                setIstouchedBacenta(true);
              }}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              className={muiClasses.margin}
              placeholder="Fellowship"
              value={fellowship}
              onChange={(event) => {
                setFellowship(event.target.value);
                setIstouchedFellowship(true);
              }}
            />

            <TextField
              className={muiClasses.margin}
              placeholder="Ministry"
              value={ministry}
              onChange={(event) => {
                setMinistry(event.target.value);
                setIstouchedMinistry(true);
              }}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              className={muiClasses.margin}
              placeholder="Branch"
              value={branch}
              onChange={(event) => {
                setBranch(event.target.value);
                setIstouchedBranch(true);
              }}
            />

            <TextField
              className={muiClasses.margin}
              placeholder="Name of Shepherd"
              value={nameOfShepherd}
              onChange={(event) => {
                setNameOfShepherd(event.target.value);
                setIstouchedNameOfShepherd(true);
              }}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              className={muiClasses.margin}
              placeholder="Name of Relation"
              value={nameOfRelation}
              onChange={(event) => {
                setNameOfRelation(event.target.value);
                setIstouchedNameOfRelation(true);
              }}
            />

            <TextField
              className={muiClasses.margin}
              placeholder="Contach of Relation"
              value={contactOfRelation}
              onChange={(event) => {
                setContactOfRelation(event.target.value);
                setIstouchedContactOfRelation(true);
              }}
            />
          </InputGroup>
          <div
            style={{
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 25,
              textAlign: "center",
            }}
          >
            {" "}
            <Button
              type="submit"
              variant="outlined"
              disabled={isFormValid ? false : true}
            >
              UPDATE MEMBER
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default MemberUpdate;
