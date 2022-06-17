import "./App.css";
import React, { useEffect } from "react";
import SignIn from "./SignIn";
import Members from "./Members/Members";
import logo from "../src/Assets/LHIBanner.jpg";
import Register from "./Register/Register";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Update from "./Members/MemberUpdate/MemberUpdate";
import { bindActionCreators } from "redux";
import * as ActionCreators from "./Store/ActionCreators";
import { useSelector, useDispatch } from "react-redux";
import SnackBar from "./UI/SnackBar/SnackBar";

const App = (props) => {
  const dispatch = useDispatch();
  const { userAuthentication } = bindActionCreators(ActionCreators, dispatch);
  const loginAuth = useSelector((state) => state.userAuth);

  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("userData"));
    if (loginUser && loginUser.token) {
      userAuthentication(true);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...loginUser,
        })
      );
    }
  }, [userAuthentication]);

  return (
    <div className="App">
      {loginAuth && (
        <img
          src={logo}
          alt="banner"
          style={{
            textAlign: "center",

            margin: 0,
            width: "100%",
            height: 175,
          }}
        />
      )}
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignIn} />

          {loginAuth && <Route path="/members" component={Members} />}
          {loginAuth && <Route path="/member/register" component={Register} />}
          {loginAuth && <Route path="/member/update/:id" component={Update} />}
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
      <SnackBar />
    </div>
  );
};

export default App;
