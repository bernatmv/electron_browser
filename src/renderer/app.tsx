import React from "react";
import styled from "styled-components";
import { connect, ConnectedProps } from "react-redux";
import { demoOperations } from "./ducks/demo";
import { AppState } from "./store/initial-state";

// Redux mapping & types

const mapState = (state: AppState) => ({
  demo: state.demo,
});

const mapDispatch = {
  appendText: demoOperations.appendText,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

// Component

const App = ({ demo, appendText }: Props) => (
  <Title>
    {demo.text}
    <FancyButton onClick={() => appendText({ text: "!" })}>!</FancyButton>
  </Title>
);

// Styles

const Title = styled.div`
  font-size: 1.8em;
  font-weight: bold;
`;

const FancyButton = styled.button`
  display: block;
  margin-top: 10px;
`;

// Export

export default connector(App);
