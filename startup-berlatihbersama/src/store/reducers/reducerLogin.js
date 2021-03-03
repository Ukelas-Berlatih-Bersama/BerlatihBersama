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
      // localStorage.setItem("user", action.payload.data.email);
      let newState = {
        ...state,
        isLogin: true,
        user: action.payload.email,
      };
      return newState;

    case "LOGOUT":
      localStorage.removeItem("token");
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
