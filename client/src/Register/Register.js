import React, { useRef, useState, useEffect } from "react";

import "./Register.css";
import NavigationBar from "../UI/NavigationBar/NavigationBar";
// import Navigation from "../UI/Navigation/Navigation";
import logo from "../Assets/LHI.jpg";
import TextField from "@material-ui/core/TextField";

import InputGroup from "../UI/InputGroup/InputGroup";

import Camera from "@material-ui/icons/Camera";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as actionCreators from "../Store/ActionCreators";
import axiosInstance from "../config";
import { styles } from "@material-ui/core";

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

const Register = () => {
  const imageRef = useRef();
  const classes = useStyles();

  const dispatch = useDispatch();
  const { showSnackBar } = bindActionCreators(actionCreators, dispatch);

  const [isFormValid, setIsFormValid] = useState(false);
  const [imageURL, setImageURL] = useState();
  // const [memberSuccessful, setmemberSuccessful] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isValidImage, setIsValidImage] = useState(false);

  //form data states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [location, setLocation] = useState("");
  const [bacenta, setBacenta] = useState("");
  const [fellowship, setFellowship] = useState("");
  const [ministry, setMinistry] = useState("");
  const [branch, setBranch] = useState("");
  const [nameOfShepherd, setNameOfShepherd] = useState("");
  const [nameOfRelation, setNameOfRelation] = useState("");
  const [contactOfRelation, setContactOfRelation] = useState("");
  //form data states

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

  const addMemberHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (imageFile !== null) {
      formData.append("imageFile", imageFile[0]); // appending form data
    }
    formData.append("first", firstName);
    formData.append("last", lastName);
    formData.append("other", otherNames);
    formData.append("email", email);
    formData.append("birth", dateOfBirth);
    formData.append("telephone", phoneNumber);
    formData.append("location", location);
    formData.append("branch", branch);
    formData.append("bacenta", bacenta);
    formData.append("fellowship", fellowship);
    formData.append("ministry", ministry);
    formData.append("shepherd", nameOfShepherd);
    formData.append("relation", nameOfRelation);
    formData.append("relationContact", contactOfRelation);

    const memberAvailability = {
      first: firstName,
      last: lastName,
    };

    axiosInstance
      .post("/member/validate", memberAvailability)
      .then((resp) => {
        if (resp.data.exist) {
          showSnackBar(true, "member already exist", "warning");
        } else {
          axiosInstance
            .post("/member/register", formData, {
              headers: {
                "content-type": "multipart/form-data",
                authorization:
                  "Bearer " +
                  JSON.parse(localStorage.getItem("userData")).token,
              },
            })
            .then((res) => {
              showSnackBar(true, "member created", "success");
              setImageURL(null);
              setBacenta("");
              setBranch("");
              setContactOfRelation("");
              setPhoneNumber("");
              setFellowship("");
              setFellowship("");
              setEmail("");
              setNameOfShepherd("");
              setNameOfRelation("");
              setMinistry("");
              setNameOfRelation("");
              setOtherNames("");
              setFirstName("");
              setLastName("");
              setDateOfBirth("");
              setLocation("");
              setIsValidImage(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        showSnackBar(true, "try again something went wrong", "error");
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
        <img src={logo} alt="logo" />

        {/* <Navigation isRegister={true} /> */}
      </NavigationBar>
      <Container>
        <form className="Register-Form" onSubmit={addMemberHandler}>
          <div className="Register-Form-File">
            <h1>ADD MEMBER</h1>

            <img src={imageURL} alt="" />
            <p
              onClick={imagePickerHandler}
              style={{
                color: "#ccc",
                cursor: "pointer",
                marginBottom: "35px",
                // width: "50%",
                marginLeft: "15%",
              }}
            >
              <Camera />
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            name="image"
            style={{ display: "none" }}
            ref={imageRef}
            onChange={changeImageHandler}
          />

          <InputGroup>
            <TextField
              className={classes.margin}
              placeholder="First Name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />

            <TextField
              className={classes.margin}
              placeholder="Last Name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              className={classes.margin}
              placeholder="Other Names"
              value={otherNames}
              onChange={(event) => setOtherNames(event.target.value)}
            />

            <TextField
              className={classes.margin}
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              className={classes.margin}
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <TextField
              className={classes.margin}
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              className={classes.margin}
              placeholder="Location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />

            <TextField
              className={classes.margin}
              placeholder="Bacenta"
              value={bacenta}
              onChange={(event) => setBacenta(event.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              className={classes.margin}
              placeholder="Fellowship"
              value={fellowship}
              onChange={(event) => setFellowship(event.target.value)}
            />

            <TextField
              className={classes.margin}
              placeholder="Ministry"
              value={ministry}
              onChange={(event) => setMinistry(event.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              className={classes.margin}
              placeholder="Branch"
              value={branch}
              onChange={(event) => setBranch(event.target.value)}
            />

            <TextField
              className={classes.margin}
              placeholder="Name of Shepherd"
              value={nameOfShepherd}
              onChange={(event) => setNameOfShepherd(event.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <TextField
              className={classes.margin}
              placeholder="Name of Relation"
              value={nameOfRelation}
              onChange={(event) => setNameOfRelation(event.target.value)}
            />

            <TextField
              className={classes.margin}
              placeholder="Contach of Relation"
              value={contactOfRelation}
              onChange={(event) => setContactOfRelation(event.target.value)}
            />
          </InputGroup>

          <div
            style={{
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
            }}
          >
            {" "}
            <Button
              type="submit"
              variant="outlined"
              disabled={isFormValid ? false : true}
            >
              ADD MEMBER
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Register;
