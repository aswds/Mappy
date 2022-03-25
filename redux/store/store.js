import Reducers from "../reducers";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

export const store = createStore(Reducers, applyMiddleware(thunk));
