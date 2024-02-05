// store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import uploadSlice from "./uploadSlice";

const rootReducer = combineReducers({
  auth: auth,
  uploadSlice : uploadSlice
  // Add other reducers as needed
});

export default rootReducer;
