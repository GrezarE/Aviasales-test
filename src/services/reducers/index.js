import { combineReducers } from "redux";
import { searchIdReducer } from "./searchId";



export const rootReducer = combineReducers({
  searchId: searchIdReducer
})
