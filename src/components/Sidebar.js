/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { getCookie } from '../Assets/coockie';
import axios from 'axios';

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [sidebardata, setSidebarData] = useState([]);
  const token = getCookie("authToken");

  const showSidebar = () => setSidebar(!sidebar);

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
  
  console.log("responce", 11, token);
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
    try {
      // Make an HTTP request using Axios
      const response = await axios.request(reqOptions);
      console.log("responce", response);
      if (response?.data?.success) {
    setSidebarData(organizeTabsIntoHierarchy(response?.data?.result))

      }
    } catch (error) {
      // Handle login error
      console.error("Login failed", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>

            {sidebardata?.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
