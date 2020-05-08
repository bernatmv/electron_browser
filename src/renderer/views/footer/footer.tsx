import React from "react";
import styled from "styled-components";
import { Props } from "./footer.container";
import { config } from "common/config/config";

const Footer = ({ activeUrl }: Props) => <Container>{activeUrl}</Container>;

// Styles

const Container = styled.div`
  display: flex;
  flex: 0 0 ${config.layout.footerHeight}px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0 0 10px;

  background: #eee;

  font-size: 11px;
  color: #888;
`;

// Export

export default Footer;
