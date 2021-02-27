import React, { useCallback, useEffect, useMemo, useState } from "react";
import { List, ListItem } from "./components/List";
import SearchField from "./components/SearchField";
import { TabList, Tabs, Tab, TabPanels, TabPanel } from "./components/Tabs";
import { isGraphQL, parseEntry } from "./utils";
import JSONTree from "react-json-tree";

interface DevToolsPanelProps {
  requestFinished: any;
  getHAR: any;
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

  const filteredRequests = useMemo(() => {
    const regex = new RegExp(search, "i");
    return state.filter(request => {
      return request.data.some(operation => operation.name.match(regex));
    })
  }, [state, search])


  if (state.length === 0) {
    return <div style={{ color: '#444' }}>No GraphQL queries captured yet</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SearchField onChange={setSearch} value={search} />
        <button style={{ border: 0, backgroundColor: 'rebeccapurple', color: 'white' }} onClick={() => setState([])}>Clear</button>
      </div>
      {filteredRequests.length === 0 ?
        <div style={{ color: '#444' }}>No results</div> :
        <div className="layout">
          <div className="divider">
            <div className="operations">Operations</div>
            <List active={active} setActive={setActive}>
              {filteredRequests.map((request) => (
                <ListItem>
                  <ul style={{ margin: 0, padding: "0 10px" }}>
                    {
                      request.data.map((d) => (
                        <li key={d.id}>{d.name}</li>
                      ))
                    }
                  </ul>
                </ListItem>
              ))}
            </List>
          </div>
          <div>
            <Tabs>
              <TabList>
                <Tab>Variables</Tab>
                <Tab>Response</Tab>
                <Tab>Query</Tab>
                <Tab>Details</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <JSONTree data={filteredRequests[active].queryVariables} />
                </TabPanel>
                <TabPanel>
                  <JSONTree data={filteredRequests[active].responseBody.data} />
                </TabPanel>
                <TabPanel>
                  <pre>{`${filteredRequests[active].bareQuery}`}</pre>
                </TabPanel>
                <TabPanel>
                  <JSONTree data={filteredRequests[active]} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      }
    </div >
  );
};

export default DevToolsPanel;
