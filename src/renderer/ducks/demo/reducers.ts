import { createReducer } from "../../shared/utils";
import { DemoState, APPEND_TEXT, APPEND_ICON, AppendTextAction } from "./types";

export const demoInitialState: DemoState = {
  text: "It's alive!",
};

const demoReducer = createReducer<DemoState>(demoInitialState)({
  [APPEND_TEXT]: (state, action: AppendTextAction) => ({
    ...state,
    text: `${state.text}${action.payload.text}`,
  }),
  [APPEND_ICON]: state => ({
    ...state,
    text: `${state.text}${String.fromCodePoint(0x2764)}`,
  }),
});

export default demoReducer;
