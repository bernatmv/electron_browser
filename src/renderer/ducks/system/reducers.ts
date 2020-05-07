import { createReducer } from "common/utils";
import { SystemState, SWITCH_DEV_MODE } from "./types";

export const systemInitialState: SystemState = {
  devMode: false,
};

const systemReducer = createReducer<SystemState>(systemInitialState)({
  [SWITCH_DEV_MODE]: (state): SystemState => ({
    ...state,
    devMode: !state.devMode,
  }),
});

export default systemReducer;
