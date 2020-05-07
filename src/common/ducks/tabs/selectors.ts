import * as R from "ramda";
import normalizeUrl from "normalize-url";
import { createSelector } from "reselect";
import { AppState, Tab } from "common/types";

export const getActiveTab = (state: AppState): Tab =>
  R.find<Tab>(R.propEq("id", state.tabs.active))(state.tabs.tabs);

export const getActiveUrl = createSelector([getActiveTab], activeTab => {
  try {
    return normalizeUrl(activeTab?.url, {
      stripWWW: false,
      removeTrailingSlash: false,
    });
  } catch (error) {
    // noop
  }

  return activeTab?.url;
});
