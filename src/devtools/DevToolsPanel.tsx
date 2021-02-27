import React, { useCallback, useEffect, useState } from "react";
import { List, ListItem } from "./components/List";
import SearchField from "./components/SearchField";
import { TabList, Tabs, Tab, TabPanels } from "./components/Tabs";
import { isGraphQL, parseEntry } from "./utils";
import JSONTree from "react-json-tree";

interface DevToolsPanelProps {
  requestFinished: any;
  getHAR: any;
  theme: string;
}

const DevToolsPanel: React.FC<DevToolsPanelProps> = ({ requestFinished }) => {
  const [state, setState] = useState([]);
  const [search, setSearch] = useState<string>("");
  const [active, setActive] = useState(0);

  const requestHandler = useCallback(
    (request) => {
      if (!isGraphQL(request)) return null;
      return parseEntry(request).then((data: any[]) => {
        setState([...state, ...data]);
      });
    },
    [state]
  );

  useEffect(() => {
    requestFinished.addListener(requestHandler);
    return () => requestFinished.removeListener(requestHandler);
  }, [requestHandler]);

  console.log(state);

  if (state.length === 0) {
    return <div>No GraphQL queries captured yet</div>;
  }

  return (
    <div>
      <SearchField onChange={setSearch} value={search} />
      <div className="layout">
        <div className="divider">
          <div className="operations">Operations</div>
          <List active={active} setActive={setActive}>
            {state.map((request) => {
              return request.data.map((d) => (
                <ListItem key={d.id}>{d.name}</ListItem>
              ));
            })}
          </List>
        </div>
        <div>
          <Tabs>
            <TabList>
              <Tab>Variables</Tab>
              <Tab>Response</Tab>
              <Tab>Query</Tab>
            </TabList>
            <TabPanels>
              <div className="tabPanel">
                <JSONTree data={state[active].queryVariables} />
              </div>
              <div className="tabPanel">
                <JSONTree data={state[active].responseBody.data} />
              </div>
              <div className="tabPanel">
                <pre>{`${state[active].bareQuery}`}</pre>
              </div>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DevToolsPanel;
