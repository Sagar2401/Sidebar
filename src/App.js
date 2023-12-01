import React from "react";
import "./App.css";
import {  Routes, Route,  } from "react-router-dom";
import Overview from "./pages/Overview";
import { data } from "./components/SidebarData";
import { Login } from "./pages/Login";

function App() {

  function organizeTabsIntoHierarchy(tabArray) {
    const organizedTabs = {};

    // Group tabs by parentId
    tabArray.forEach((tab) => {
      const parentId = tab.parentId;
      if (!organizedTabs[parentId]) {
        organizedTabs[parentId] = [];
      }
      organizedTabs[parentId].push(tab);
    });

    // Build hierarchy
    function buildHierarchy(parentId) {
      const children = organizedTabs[parentId];
      if (children) {
        return children.map((child) => {
          const childWithChildren = {
            ...child,
            children: buildHierarchy(child.encryptedTabId),
          };
          return childWithChildren;
        });
      } else {
        return [];
      }
    }

    // Root level tabs (parentId = 0)
    const rootTabs = organizedTabs["0"] || [];

    // Build the hierarchy
    const hierarchy = rootTabs.map((rootTab) => {
      return { ...rootTab, children: buildHierarchy(rootTab.encryptedTabId) };
    });

    return hierarchy;
  }

  console.log("organizeTabsIntoHierarchy", organizeTabsIntoHierarchy(data));

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
      
            <Route path="/home" element={<Overview />} />
            {data.map((item) => {
              if (item.webPage) {
                console.log(item.webPage);
                return (
                  <Route
                    path={item.webPage.toLocaleLowerCase()}
                    element={<Overview />}
                  />
                );
              } else return null;
            })}
        </Routes>
    </div>
  );
}

export default App;
