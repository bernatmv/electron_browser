export const TAB_ADD = "tabs/TAB_ADD";
export const TAB_REMOVE = "tabs/TAB_REMOVE";
export const TAB_NAVIGATE = "tabs/TAB_NAVIGATE";
export const TAB_GO_BACK = "tabs/TAB_GO_BACK";
export const TAB_GO_FORWARD = "tabs/TAB_GO_FORWARD";
export const TAB_SET_ACTIVE = "tabs/TAB_SET_ACTIVE";

// Payloads

export interface IdPayload {
  id: string;
}

export interface NavigatePayload extends IdPayload {
  url: string;
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

export interface TabNavigateAction {
  type: typeof TAB_NAVIGATE;
  payload: NavigatePayload;
}

export interface TabGoBackAction {
  type: typeof TAB_GO_BACK;
  payload: IdPayload;
}

export interface TabGoForwardAction {
  type: typeof TAB_GO_FORWARD;
  payload: IdPayload;
}

export interface TabSetActiveAction {
  type: typeof TAB_SET_ACTIVE;
  payload: IdPayload;
}

export type TabActionTypes =
  | TabAddAction
  | TabRemoveAction
  | TabNavigateAction
  | TabGoBackAction
  | TabGoForwardAction
  | TabSetActiveAction;
