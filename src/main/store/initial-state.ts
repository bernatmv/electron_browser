import { AppState } from "common/types";
import { electronInitialState } from "common/ducks/electron";

const initialState: AppState = {
  electron: electronInitialState,
};

export default initialState;
