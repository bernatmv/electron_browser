import React from "react";
import styled from "styled-components";
import { Navigation } from "./views/navigation";
import { BrowserView } from "./views/browser-view";
import { Footer } from "./views/footer";

const App = () => (
  <Container>
    <Navigation />
    <BrowserView />
    <Footer />
  </Container>
);

// Styles

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

// Export

export default App;
