import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Navigation from "./navigation";
import { tabsOperations } from "common/ducks/tabs";
import { AppState } from "common/types";

const mapState = (state: AppState) => ({
  ...state.tabs,
});

const mapDispatch = {
  ...tabsOperations,
};

const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;

const NavigationContainer = (props: Props) => <Navigation {...props} />;

export default connector(NavigationContainer);
