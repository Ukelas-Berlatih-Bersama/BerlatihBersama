let initialState = {
  isLogin: false,
  user: "",
  error: false,
  message: "",
};

function reducerLogin(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogin: true,
        user: action.payload.email,
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      return false;

    case "REGISTER":
      return {
        ...state,
        message: action.value,
      };

    case "AUTH_ERROR":
      return {
        ...state,
        error: true,
        message: action.payload,
      };

    default:
      return state;
  }
}

export default reducerLogin;
