import { combineReducers } from "redux";
import { searchIdReducer } from "./searchId";
import { ticketsReducer } from "./tickets";



export const rootReducer = combineReducers({
  searchId: searchIdReducer,
  tickets: ticketsReducer
})
