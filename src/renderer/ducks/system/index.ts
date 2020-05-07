import reducer, { systemInitialState } from "./reducers";
import * as systemOperations from "./actions";
import * as systemTypes from "./types";
import systemEpics from "./epics";

export { systemOperations, systemInitialState, systemTypes, systemEpics };

export default reducer;
