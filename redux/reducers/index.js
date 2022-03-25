import { combineReducers } from "redux";
import { user } from "./user";
import postReducer from "./posts";
import { themeReducer } from "./theme";
const Reducers = combineReducers({
  userState: user,
  postIsUploading: postReducer,
  themeState: themeReducer,
});

export default Reducers;
