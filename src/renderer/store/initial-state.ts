import { AppState } from "common/types";
import { tabsInitialState } from "common/ducks/tabs";

const initialState: AppState = {
  tabs: tabsInitialState,
};

export default initialState;
