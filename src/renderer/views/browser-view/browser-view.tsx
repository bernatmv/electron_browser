import React from "react";
import styled from "styled-components";

const BrowserView = () => <Container />;

// Styles

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background: #fff;
`;

// Export

export default BrowserView;
