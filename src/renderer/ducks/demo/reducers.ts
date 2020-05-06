import { createReducer } from "../../shared/utils";
import { DemoState, APPEND_TEXT, DemoActionTypes } from "./types";

export const demoInitialState: DemoState = {
  text: "It's alive!",
};

const demoReducer = createReducer<DemoState, DemoActionTypes>(demoInitialState)(
  {
    // all types inferred due to the: createReducer<DemoState, DemoActionTypes>
    [APPEND_TEXT]: (state, action) => ({
      ...state,
      text: `${state.text}${action.payload.text}`,
    }),
  }
);

export default demoReducer;
