import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Overview = () => {
  const location = useLocation();

  return (
    <>
      <Sidebar />

      <div className="home">
        <h1>{location.pathname.substring(1)}</h1>
      </div>
    </>
  );
};

export default Overview;
