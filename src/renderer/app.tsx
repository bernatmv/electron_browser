import React from "react";
import styled from "styled-components";
import { connect, ConnectedProps } from "react-redux";
import { demoOperations } from "./ducks/demo";
import { RendererState } from "./store/initial-state";
import { electronOperations } from "common/ducks/electron";

// Redux mapping & types

const mapState = (state: RendererState) => ({
  demo: state.demo,
  electron: state.electron,
});

const mapDispatch = {
  appendText: demoOperations.appendText,
  changeColor: electronOperations.changeColor,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

// Component

const App = ({ demo, electron, appendText, changeColor }: Props) => (
  <Title style={{ color: electron.color }}>
    {demo.text}
    <FancyButton onClick={() => appendText({ text: "!" })}>!</FancyButton>
    <FancyButton onClick={() => changeColor({ color: "red" })}>
      change color to red
    </FancyButton>
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
