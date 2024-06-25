import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

import BalanceBox from "../Components/BalanceBox";
import UsersBox from "../Components/UsersBox";

const Dashboard = () => {
 
  return (
    <div>
      <Navbar />
      <div className="mt-14 p-5">
        <BalanceBox />
        <UsersBox />
      </div>
    </div>
  );
};

export default Dashboard;
