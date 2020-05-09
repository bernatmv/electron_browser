import { BaseAction } from "common/types";

export const TAB_ADD = "tabs/TAB_ADD";
export const TAB_REMOVE = "tabs/TAB_REMOVE";
export const TAB_NAVIGATE = "tabs/TAB_NAVIGATE";
export const TAB_NAVIGATE_FULFILLED = "tabs/TAB_NAVIGATE_FULFILLED";
export const TAB_GO_TO_OFFSET = "tabs/TAB_GO_TO_OFFSET";
export const TAB_SET_ACTIVE = "tabs/TAB_SET_ACTIVE";

// Payloads

export interface IdPayload {
  id: string;
}

export interface NavigatePayload extends IdPayload {
  url: string;
}

export interface NavigationFulfilledPayload extends IdPayload {
  url: string;
  canGoBack: boolean;
  canGoForward: boolean;
}

export interface GoToOffsetPayload extends IdPayload {
  offset: number;
}

// Actions

export interface TabAddAction {
  type: typeof TAB_ADD;
  payload: IdPayload;
}

export interface TabRemoveAction {
  type: typeof TAB_REMOVE;
  payload: IdPayload;
}

export interface TabNavigateAction extends BaseAction {
  type: typeof TAB_NAVIGATE;
  payload: NavigatePayload;
}

export interface TabNavigateFulfilledAction extends BaseAction {
  type: typeof TAB_NAVIGATE_FULFILLED;
  payload: NavigationFulfilledPayload;
}

export interface TabGoToOffsetAction extends BaseAction {
  type: typeof TAB_GO_TO_OFFSET;
  payload: GoToOffsetPayload;
}

export interface TabSetActiveAction {
  type: typeof TAB_SET_ACTIVE;
  payload: IdPayload;
}

export type TabActionTypes =
  | TabAddAction
  | TabRemoveAction
  | TabNavigateAction
  | TabNavigateFulfilledAction
  | TabGoToOffsetAction
  | TabSetActiveAction;
