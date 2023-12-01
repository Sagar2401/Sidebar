import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import  { Loading2 } from "../components/Loader/Loading";

const Overview = ({ data,loading }) => {
  const location = useLocation();

  if (loading) {
    return (
      <div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Loading2 />
      </div>
    );
  }
  return (
    <>
      <Sidebar data={data} />

      <div className="home">
        <h1>{location.pathname.substring(1)}</h1>
      </div>
    </>
  );
};

export default Overview;
