import React, { useEffect, useState } from "react";
import "./App.css";
import {  Routes, Route, useNavigate,  } from "react-router-dom";
import Overview from "./pages/Overview";
import { data } from "./components/SidebarData";
import { Login } from "./pages/Login";
import { getCookie } from "./Assets/coockie";
import axios from "axios";

function App() {
const navigate = useNavigate()
  const token = getCookie('authToken')
  const [sidebardata, setSidebarData] = useState([]);
  const [loading, setLoading] = useState(false)

  function organizeTabsIntoHierarchy(tabArray) {
    const organizedTabs = {};
    
    // Group tabs by parentId
    tabArray.forEach(tab => {
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
        return children.map(child => {
          const childWithChildren = { ...child, children: buildHierarchy(child.encryptedTabId) };
          return childWithChildren;
        });
      } else {
        return [];
      }
    }
  
    // Root level tabs (parentId = 0)
    const rootTabs = organizedTabs['0'] || [];
    
    // Build the hierarchy
    const hierarchy = rootTabs.map(rootTab => {
      return { ...rootTab, subNav: buildHierarchy(rootTab.encryptedTabId) };
    });
  
    return hierarchy;
  }
    
  useEffect(() => {
  }, [])
  
  let headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token && token}`,
  };

  let reqOptions = {
    url: "https://scorenodeapi.cloudd.live/admin/tabs",
    method: "POST",
    headers: headersList,
  };

  const getData = async () => {
    setLoading(true)
    try {
      // Make an HTTP request using Axios
      const response = await axios.request(reqOptions);
      if (response?.data?.success) {
    setSidebarData(organizeTabsIntoHierarchy(response?.data?.result))
    setLoading(false)

      }
    } catch (error) {
      // Handle login error
    setLoading(false)

      console.error("Login failed", error);
    }
  };

useEffect(() => {
 if (token){
  navigate("/home");
  getData();
  
 }else(
  navigate("/")

 )
}, [token])


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      
            <Route path="/home" element={<Overview loading={loading} data={sidebardata}/>} />
            {data.map((item) => {
              if (item.webPage) {
                return (
                  <Route
                    path={item.webPage.toLocaleLowerCase()}
                    element={<Overview data={sidebardata} 
                    loading={loading}
                    />}
                  />
                );
              } else return null;
            })}
        </Routes>
    </>
  );
}

export default App;
