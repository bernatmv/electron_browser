import {
  IdPayload,
  TabAddAction,
  TAB_ADD,
  TabRemoveAction,
  TAB_REMOVE,
  NavigatePayload,
  TabNavigateAction,
  TAB_NAVIGATE,
  TabSetActiveAction,
  TAB_SET_ACTIVE,
  TabNavigateFulfilledAction,
  TAB_NAVIGATE_FULFILLED,
  NavigationFulfilledPayload,
  TabGoToOffsetAction,
  TAB_GO_TO_OFFSET,
  GoToOffsetPayload,
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
  payload: NavigationFulfilledPayload
): TabNavigateFulfilledAction => ({
  type: TAB_NAVIGATE_FULFILLED,
  payload,
  meta: {
    async: true,
  },
});

export const tabGoToOffset = (
  payload: GoToOffsetPayload
): TabGoToOffsetAction => ({
  type: TAB_GO_TO_OFFSET,
  payload,
});

export const tabSetActive = (payload: IdPayload): TabSetActiveAction => ({
  type: TAB_SET_ACTIVE,
  payload,
});
