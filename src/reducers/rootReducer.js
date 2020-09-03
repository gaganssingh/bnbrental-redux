import { combineReducers } from "redux";
import authReducer from "./authReducer";
import siteModal from "./siteModal";

const rootReducer = combineReducers({
    auth: authReducer,
    siteModal,
});

export default rootReducer;
