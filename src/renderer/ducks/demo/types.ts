export const APPEND_TEXT = "demo/APPEND_TEXT";

export interface AppendTextPayload {
  text: string;
}

export interface AppendTextAction {
  type: typeof APPEND_TEXT;
  payload: AppendTextPayload;
}

export type DemoActionTypes = AppendTextAction;

export interface DemoState {
  text: string;
}
