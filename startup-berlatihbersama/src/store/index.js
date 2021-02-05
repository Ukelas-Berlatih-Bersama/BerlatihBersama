import { createStore, applyMiddleware } from "redux";
import reducerLogin from "./reducers/reducerLogin";
import thunk from "redux-thunk";

const middleware = applyMiddleware(thunk);
const store = createStore(reducerLogin, middleware);

export default store;
