import React, { FC } from "react";
import styled from "styled-components";

const App: FC<{}> = () => <Title>It&apos;s alive!!</Title>;

const Title = styled.div`
  font-size: 1.8em;
  font-weight: bold;
`;

export default App;
