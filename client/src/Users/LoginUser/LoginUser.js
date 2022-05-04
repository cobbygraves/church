import React, { useState, useEffect, useRef } from "react";
// import { connect } from "react-redux";
// import { setAuthentication } from "../../Store/Actions";
import "./LoginUser.css";
import LHI from "../../Assets/LHI.jpg";
import axiosInstance from "../../config";
import Spinner from "../../UI/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../../Store/ActionCreators";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  loginInput: {
    marginBottom: 10,
    width: "100%",
  },
});

const LoginUser = (props) => {
  const isUserAuth = useSelector((state) => state.userAuth);
  const classes = useStyles();

  const dispatch = useDispatch();

  const { userAuthentication } = bindActionCreators(ActionCreators, dispatch);

  const loginRef = useRef();

  const [usernameValue, setUsernameValue] = useState("");

  const [passwordValue, setPasswordValue] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  const [buttonSubmit, setButtonSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeEmailHandler = (event) => {
    setUsernameValue(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setPasswordValue(event.target.value);
  };

  useEffect(() => {
    if (usernameValue.length > 0 && passwordValue.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [usernameValue, passwordValue]);

  useEffect(() => {
    loginRef.current.focus();
  }, []);

  useEffect(() => {
    if (isUserAuth) {
      props.history.push("/members");
      setButtonSubmit(false);
    }
  }, [isUserAuth, props]);

  const loginUserHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axiosInstance
      .post(`user/login`, {
        username: usernameValue,
        password: passwordValue,
      })
      .then((res) => {
        const user = res.data;

        const userData = JSON.stringify(user);

        localStorage.setItem("userData", userData);
        setIsLoading(false);
        if (user) {
          userAuthentication(true);
        } else {
          userAuthentication(false);
          setButtonSubmit(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setButtonSubmit(true);
        setIsLoading(false);
      });
  };
  return (
    <div>
      <div className="DisplayImage">
        <img src={LHI} alt="" />
      </div>
      <div className="LoginUser">
        <form onSubmit={loginUserHandler}>
          <h2>Login User</h2>

          {!isUserAuth && buttonSubmit && (
            <p style={{ color: "red", textAlign: "center" }}>
              Wrong Email / Password
            </p>
          )}

          {isLoading && <Spinner />}

          <div className="NewUser-Input-Div">
            <TextField
              placeholder="username"
              variant="filled"
              value={usernameValue}
              ref={loginRef}
              type="text"
              error={!isUserAuth && buttonSubmit}
              onChange={changeEmailHandler}
              className={classes.loginInput}
            />
          </div>

          <div className="NewUser-Input-Div">
            <TextField
              placeholder="password"
              variant="filled"
              value={passwordValue}
              type="password"
              onChange={changePasswordHandler}
              className={classes.loginInput}
              error={!isUserAuth && buttonSubmit}
            />
          </div>

          <Button
            variant="outlined"
            color="primary"
            type="submit"
            disabled={!isFormValid}
          >
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     userAuth: state.isUserAuth,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setUserAuth: (loginUser) => dispatch(setAuthentication(loginUser)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LoginUser);
export default LoginUser;
