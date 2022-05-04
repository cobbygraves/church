import { USER_AUTHENTICATION, SHOW_SNACKBAR } from "./Actions";

export const userAuthentication = (isAuth) => (dispatch) =>
  dispatch({
    type: USER_AUTHENTICATION,
    logOut: isAuth,
  });

export const showSnackBar = (isOpen, message, type) => (dispatch) =>
  dispatch({
    type: SHOW_SNACKBAR,
    showSnack: isOpen,
    messageSnack: message,
    typeSnack: type,
  });
