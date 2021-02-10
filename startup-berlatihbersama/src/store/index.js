import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reducerLogin from "./reducers/reducerLogin";
import thunk from "redux-thunk";

const reducers = combineReducers({
  reducerLogin,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = applyMiddleware(thunk);
const enhancers = composeEnhancers(middlewares);

const store = createStore(reducers, enhancers);

export default store;
