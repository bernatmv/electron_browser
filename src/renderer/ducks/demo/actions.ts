import { APPEND_TEXT, AppendTextPayload, DemoActionTypes } from "./types";

export const appendText = (payload: AppendTextPayload): DemoActionTypes => ({
  type: APPEND_TEXT,
  payload,
});
