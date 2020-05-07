import { createReducer } from "common/utils";
import { CHANGE_COLOR, ChangeColorAction } from "./types";
import { ElectronState } from "common/types";

export const electronInitialState: ElectronState = {
  color: "#000",
};

const electronReducer = createReducer<ElectronState>(electronInitialState)({
  [CHANGE_COLOR]: (state, action: ChangeColorAction) => ({
    ...state,
    color: action.payload.color,
  }),
});

export default electronReducer;
