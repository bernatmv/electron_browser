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
} from "./types";
import { TabsState, Tab } from "common/types";

const defaultUrl = "https://www.thebrowser.company/";

const newTab = (id: string): Tab => ({
  id,
  url: defaultUrl,
  history: [],
  forward: [],
});

export const tabsInitialState: TabsState = {
  tabs: [newTab("default")],
  active: "default",
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
              history: [...tab.history, tab.url],
              forward: [],
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
              url: R.last(tab.history) ? R.last(tab.history) : tab.url,
              history: R.slice(0, -1, tab.history),
              forward: [tab.url, ...tab.forward],
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
              url: R.head(tab.forward) ? R.head(tab.forward) : tab.url,
              history: [...tab.history, tab.url],
              forward: R.slice(1, Infinity, tab.forward),
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
