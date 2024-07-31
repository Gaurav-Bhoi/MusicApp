import { configureStore, combineReducers } from "@reduxjs/toolkit";
import musicReducer from "./Reducers/musicReducer";
import settingsReducer from "./Reducers/settingsReducer";
import loaderReducer from "./Reducers/loaderReducer";

const reducer = combineReducers({
  musicReducer, settingsReducer, loaderReducer
})

const STORE = configureStore({
  reducer,
})

export default STORE