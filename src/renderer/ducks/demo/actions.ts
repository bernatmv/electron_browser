import {
  APPEND_TEXT,
  AppendTextPayload,
  DemoActionTypes,
  APPEND_ICON,
} from "./types";

export const appendText = (payload: AppendTextPayload): DemoActionTypes => ({
  type: APPEND_TEXT,
  payload,
  meta: {
    scope: "local",
  },
});

export const appendIcon = (): DemoActionTypes => ({
  type: APPEND_ICON,
  meta: {
    scope: "local",
  },
});
