import { combineReducers } from "redux";
import offReducer from "./offReducer";

const rootReducer = combineReducers({
    off: offReducer,
});
export default rootReducer;
