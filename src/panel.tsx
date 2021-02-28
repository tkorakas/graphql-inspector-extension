import App from "./devtools/App";
import React from "react";
import ReactDOM from "react-dom";

let alreadyShown = false;

function createPanel() {
  chrome.devtools.panels.create(
    "GraphQL Inspector",
    "icon16.png",
    "panel.html",
    (panel) => {
      panel.onShown.addListener((panelWindow) => {
        if (!alreadyShown) {
          ReactDOM.render(
            <App />,
            panelWindow.document.getElementById("results")
          );
        }
        alreadyShown = true;
      });
    }
  );
}

createPanel();
