import {
  IdPayload,
  TabAddAction,
  TAB_ADD,
  TabRemoveAction,
  TAB_REMOVE,
  NavigatePayload,
  TabNavigateAction,
  TAB_NAVIGATE,
  TabGoBackAction,
  TAB_GO_BACK,
  TabGoForwardAction,
  TAB_GO_FORWARD,
  TabSetActiveAction,
  TAB_SET_ACTIVE,
  TabNavigateFulfilledAction,
  TAB_NAVIGATE_FULFILLED,
} from "./types";

export const tabAdd = (payload: IdPayload): TabAddAction => ({
  type: TAB_ADD,
  payload,
});

export const tabRemove = (payload: IdPayload): TabRemoveAction => ({
  type: TAB_REMOVE,
  payload,
});

export const tabNavigate = (payload: NavigatePayload): TabNavigateAction => ({
  type: TAB_NAVIGATE,
  payload,
  meta: {
    async: true,
  },
});

export const tabNavigateFulFilled = (
  payload: IdPayload
): TabNavigateFulfilledAction => ({
  type: TAB_NAVIGATE_FULFILLED,
  payload,
  meta: {
    async: true,
  },
});

export const tabGoBack = (payload: IdPayload): TabGoBackAction => ({
  type: TAB_GO_BACK,
  payload,
});

export const tabGoForward = (payload: IdPayload): TabGoForwardAction => ({
  type: TAB_GO_FORWARD,
  payload,
});

export const tabSetActive = (payload: IdPayload): TabSetActiveAction => ({
  type: TAB_SET_ACTIVE,
  payload,
});
