const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGOUT_ERROR":
      console.log("Logout error!");

      return state;
    case "LOGOUT_SUCCESS":
      console.log("Logout success!");

      return state;
    case "LOGIN_ERROR":
      console.log("Login error!");

      return {
        ...state,
        authError: "Login failed"
      };
    case "LOGIN_SUCCESS":
      console.log("Login Success!");
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_SUCCESS":
      console.log("Signup Success!");
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_ERROR":
      console.log("Signup Error!");
      return {
        ...state,
        authError: action.err.message
      };
    default:
      return state;
  }
};

export default authReducer;
