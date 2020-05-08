import React from "react";
import * as R from "ramda";
import { Tabs, Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { Props } from "./navigation.container";
import { extractHostname } from "common/utils";

const { TabPane } = Tabs;
const { Search } = Input;

const Navigation = ({
  tabs,
  active,
  tabAdd,
  tabRemove,
  tabSetActive,
  tabNavigate,
}: Props) => {
  const edit = (id, action) =>
    action === "add" ? tabAdd({ id: uuidv4() }) : tabRemove({ id });

  return (
    <Container>
      <StyledTabs
        onChange={id => tabSetActive({ id })}
        activeKey={active}
        type="editable-card"
        onEdit={edit}
      >
        {R.map(
          tab => (
            <StyledTabPane
              tab={extractHostname(tab.url)}
              key={tab.id}
              closable={true}
            >
              <StyledSearch
                placeholder={tab.url}
                onSearch={url => tabNavigate({ id: tab.id, url })}
              />
            </StyledTabPane>
          ),
          tabs
        )}
      </StyledTabs>
    </Container>
  );
};

// Styles

const StyledTabs: any = styled(Tabs)``;
const StyledTabPane: any = styled(TabPane)``;
const StyledSearch = styled(Search)``;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex: 0 0 100px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  & ${StyledTabs} {
    width: 100%;
    margin: 5px 5px 0 5px;

    & .ant-tabs-bar {
      margin: 0 0 5px 0;
    }
  }

  & ${StyledSearch} {
    width: 100%;
  }
`;

// Export

export default Navigation;
