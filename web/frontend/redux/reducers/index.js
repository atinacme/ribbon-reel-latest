import { combineReducers } from "redux";
import { HomePageReducer } from "./HomePageReducer";

const rootReducer = combineReducers({
    homePage: HomePageReducer
});

export default rootReducer;
