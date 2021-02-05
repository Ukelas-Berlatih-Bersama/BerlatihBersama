let initialState = {
  isLogin: false,
  // user: "",
};

function reducerLogin(state = initialState, action) {
  // console.log(action, ">>>>>");
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      let newState = {
        ...state,
        isLogin: true,
        // user: action.payload.username,
      };
      return newState;

    case "LOGOUT":
      localStorage.removeItem("access_token");
      return false;

    default:
      return state;
  }
}

export default reducerLogin;
