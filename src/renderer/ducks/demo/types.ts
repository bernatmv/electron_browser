import { BaseAction } from "common/types";

export const APPEND_TEXT = "demo/APPEND_TEXT";
export const APPEND_ICON = "demo/APPEND_ICON";

// ACTIONS

export interface AppendTextPayload {
  text: string;
}

export interface AppendTextAction extends BaseAction {
  type: typeof APPEND_TEXT;
  payload: AppendTextPayload;
}

export interface AppendIconAction extends BaseAction {
  type: typeof APPEND_ICON;
}

export type DemoActionTypes = AppendTextAction | AppendIconAction;

// STATE

export interface DemoState {
  text: string;
}
