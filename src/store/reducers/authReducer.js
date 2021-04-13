const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGOUT_ERROR":
      console.error("Logout error!");

      return state;
    case "LOGOUT_SUCCESS":
      console.error("Logout success!");

      return state;
    case "LOGIN_ERROR":
      console.error("Login error!");

      return {
        ...state,
        authError: "Login failed"
      };
    case "LOGIN_SUCCESS":
      console.error("Login Success!");
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_SUCCESS":
      console.error("Signup Success!");
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_ERROR":
      console.error("Signup Error!");
      return {
        ...state,
        authError: action.err.message
      };
    default:
      return state;
  }
};

export default authReducer;
