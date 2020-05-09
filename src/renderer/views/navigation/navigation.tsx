import React, { useState, useEffect } from "react";
import * as R from "ramda";
import { Tabs, Input, Button } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { Props } from "./navigation.container";
import { config } from "common/config/config";
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
  tabGoToOffset,
}: Props) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const tab = R.find(R.propEq("id", active), tabs);

    setSearch(tab.url);
  }, [tabs]);

  const edit = (id, action) =>
    action === "add" ? tabAdd({ id: uuidv4() }) : tabRemove({ id });

  const selectedTab = R.find(R.propEq("id", active), tabs);

  const operations = (
    <div>
      <NavButton
        shape="circle"
        icon={<ArrowLeftOutlined />}
        onClick={() => tabGoToOffset({ id: active, offset: -1 })}
        disabled={!selectedTab?.canGoBack}
      />
      <NavButton
        shape="circle"
        icon={<ArrowRightOutlined />}
        onClick={() => tabGoToOffset({ id: active, offset: 1 })}
        disabled={!selectedTab?.canGoForward}
      />
      <NavButton
        shape="circle"
        icon={<PlusOutlined />}
        onClick={() => edit(null, "add")}
      />
    </div>
  );

  return (
    <Container>
      <StyledTabs
        tabBarExtraContent={operations}
        hideAdd
        onChange={id => tabSetActive({ id })}
        activeKey={active}
        type="editable-card"
        onEdit={edit}
      >
        {R.map(
          tab => (
            <StyledTabPane
              key={tab.id}
              tab={extractHostname(tab.url)}
              closable={true}
            >
              <StyledSearch
                placeholder={tab.url}
                value={search}
                onChange={e => setSearch(e.target.value)}
                onSearch={newUrl => tabNavigate({ id: tab.id, url: newUrl })}
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
const StyledSearch = styled(Search)``;
const StyledTabPane: any = styled(TabPane)``;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex: 0 0 ${config.layout.navigationHeight}px;
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

const NavButton = styled(Button)`
  margin-right: 5px;
`;

export default Navigation;
