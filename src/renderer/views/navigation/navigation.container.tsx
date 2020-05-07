import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RendererState } from "src/renderer/store/initial-state";
import Navigation from "./navigation";
import { tabsOperations } from "common/ducks/tabs";

const mapState = (state: RendererState) => ({
  tabs: state.tabs,
});

const mapDispatch = {
  ...tabsOperations,
};

const connector = connect(mapState, mapDispatch);

export type Props = ConnectedProps<typeof connector>;

const NavigationContainer = (props: Props) => <Navigation {...props} />;

export default connector(NavigationContainer);
