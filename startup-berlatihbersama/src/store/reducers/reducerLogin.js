let initialState = {
  isLogin: false,
  // user: "",
  message: "",
};

function reducerLogin(state = initialState, action) {
  // console.log(action, ">>>>>");
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      let newState = {
        ...state,
        isLogin: true,
        // user: action.payload.email,
      };
      return newState;

    case "LOGOUT":
      localStorage.removeItem("access_token");
      return false;

    case "REGISTER":
      return {
        ...state,
        message: action.value,
      };

    default:
      return state;
  }
}

export default reducerLogin;
