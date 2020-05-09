import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { getActiveUrl } from "common/ducks/tabs/selectors";
import Footer from "./footer";
import { AppState } from "common/types";

const mapState = (state: AppState) => ({
  activeUrl: getActiveUrl(state),
});

const connector = connect(mapState);

export type Props = ConnectedProps<typeof connector>;

const FooterContainer = (props: Props) => <Footer {...props} />;

export default connector(FooterContainer);
