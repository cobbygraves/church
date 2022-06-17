import React, { useState, useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axiosInstance from "../src/config";
import Spinner from "../src/UI/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../src/Store/ActionCreators";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {!isUserAuth && buttonSubmit && (
          <p style={{ color: "red", textAlign: "center" }}>
            Wrong Email / Password
          </p>
        )}
        {isLoading && <Spinner />}
        <form className={classes.form} noValidate onSubmit={loginUserHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={usernameValue}
            ref={loginRef}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!isUserAuth && buttonSubmit}
            onChange={changeEmailHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={changePasswordHandler}
            className={classes.loginInput}
            value={passwordValue}
            error={!isUserAuth && buttonSubmit}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isFormValid}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
