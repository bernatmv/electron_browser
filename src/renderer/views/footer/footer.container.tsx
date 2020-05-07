import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { getActiveUrl } from "common/ducks/tabs/selectors";
import Footer from "./footer";
import { RendererState } from "src/renderer/store/initial-state";

const mapState = (state: RendererState) => ({
  activeUrl: getActiveUrl(state),
});

const connector = connect(mapState);

export type Props = ConnectedProps<typeof connector>;

const FooterContainer = (props: Props) => <Footer {...props} />;

export default connector(FooterContainer);
