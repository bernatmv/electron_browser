import React from "react";
import styled from "styled-components";
import { Props } from "./navigation.container";

const Navigation = ({ tabs }: Props) => {
  console.log(tabs);

  return <Container>Header</Container>;
};

// Styles

const Container = styled.div`
  display: flex;
  flex: 0 0 50px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0 0 10px;

  background: #ccc;

  font-size: 11px;
  color: #333;
`;

// Export

export default Navigation;
