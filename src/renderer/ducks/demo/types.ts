export const APPEND_TEXT = "demo/APPEND_TEXT";
export const APPEND_ICON = "demo/APPEND_ICON";

export interface AppendTextPayload {
  text: string;
}

export interface AppendTextAction {
  type: typeof APPEND_TEXT;
  payload: AppendTextPayload;
}

export interface AppendIconAction {
  type: typeof APPEND_ICON;
}

export type DemoActionTypes = AppendTextAction | AppendIconAction;

export interface DemoState {
  text: string;
}
