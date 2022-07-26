import { combineReducers } from "redux";

import ProjectReducer from "./ProjectReducers";

const rootReducer = combineReducers({
	user: ProjectReducer,
});

export default rootReducer;
