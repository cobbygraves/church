import { USER_AUTHENTICATION, SHOW_SNACKBAR } from "../Actions";

export const authenticationReducer = (state = false, action) => {
  switch (action.type) {
    case USER_AUTHENTICATION:
      return action.logOut;
    default:
      return state;
  }
};

export const snackBarReducer = (
  state = { open: false, message: "", type: "success" },
  action
) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        ...state,
        open: action.showSnack,
        message: action.messageSnack,
        type: action.typeSnack,
      };
    default:
      return state;
  }
};
