import * as R from "ramda";
import { createReducer } from "common/utils";
import {
  TAB_ADD,
  TabAddAction,
  TAB_REMOVE,
  TabRemoveAction,
  TAB_NAVIGATE,
  TabNavigateAction,
  TAB_GO_BACK,
  TabGoBackAction,
  TabGoForwardAction,
  TAB_GO_FORWARD,
  TAB_SET_ACTIVE,
  TabSetActiveAction,
  TAB_NAVIGATE_FULFILLED,
  TabNavigateFulfilledAction,
} from "./types";
import { TabsState, Tab } from "common/types";
import { config } from "common/config/config";

const newTab = (id: string): Tab => ({
  id,
  url: config.navigation.defaultUrl,
  loading: false,
  canGoBack: false,
  canGoForward: false,
});

export const tabsInitialState: TabsState = {
  tabs: [],
  active: "",
};

// Reducer

const tabsReducer = createReducer<TabsState>(tabsInitialState)({
  [TAB_ADD]: (state, action: TabAddAction): TabsState => ({
    ...state,
    tabs: [...state.tabs, newTab(action.payload.id)],
    active: action.payload.id,
  }),
  [TAB_REMOVE]: (state, action: TabRemoveAction): TabsState => {
    const remainingTabs = R.filter(
      tab => tab.id !== action.payload.id,
      state.tabs
    );

    return {
      ...state,
      tabs: remainingTabs,
      active:
        state.active === action.payload.id
          ? R.last(remainingTabs)?.id
          : state.active,
    };
  },
  [TAB_NAVIGATE]: (state, action: TabNavigateAction): TabsState => ({
    ...state,
    tabs: R.map(
      tab =>
        tab.id === action.payload.id
          ? {
              ...tab,
              url: action.payload.url,
              loading: true,
            }
          : tab,
      state.tabs
    ),
  }),
  [TAB_NAVIGATE_FULFILLED]: (
    state,
    action: TabNavigateFulfilledAction
  ): TabsState => ({
    ...state,
    tabs: R.map(
      tab =>
        tab.id === action.payload.id
          ? {
              ...tab,
              loading: false,
            }
          : tab,
      state.tabs
    ),
  }),
  [TAB_GO_BACK]: (state, action: TabGoBackAction): TabsState => ({
    ...state,
    tabs: R.map(
      tab =>
        tab.id === action.payload.id
          ? {
              ...tab,
              loading: true,
            }
          : tab,
      state.tabs
    ),
  }),
  [TAB_GO_FORWARD]: (state, action: TabGoForwardAction): TabsState => ({
    ...state,
    tabs: R.map(
      tab =>
        tab.id === action.payload.id
          ? {
              ...tab,
              loading: true,
            }
          : tab,
      state.tabs
    ),
  }),
  [TAB_SET_ACTIVE]: (state, action: TabSetActiveAction): TabsState => ({
    ...state,
    active: action.payload.id,
  }),
});

export default tabsReducer;
