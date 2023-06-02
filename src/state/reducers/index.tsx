/* eslint-disable import/no-named-as-default */
import { combineReducers } from "redux";

import UserReducer from "./UserReducer";

const reducers = combineReducers({
  user: UserReducer,
});

export default reducers;