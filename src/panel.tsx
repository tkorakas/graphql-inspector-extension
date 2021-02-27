/* global chrome */
import DevToolsPanel from "./devtools/DevToolsPanel";
import React from "react";
import ReactDOM from "react-dom";

let alreadyShown = false;

function createPanel() {
  console.log("hello");

  const theme = chrome.devtools.panels.themeName || "default";
  chrome.devtools.panels.create(
    "GraphQL Network",
    "./icon48.png",
    "./panel.html",
    (panel) => {
      panel.onShown.addListener((panelWindow) => {
        if (!alreadyShown) {
          ReactDOM.render(
            <DevToolsPanel
              requestFinished={chrome.devtools.network.onRequestFinished}
              getHAR={chrome.devtools.network.getHAR}
              theme={theme}
            />,
            panelWindow.document.getElementById("results")
          );
        }
        alreadyShown = true;
      });
    }
  );
}

createPanel();
