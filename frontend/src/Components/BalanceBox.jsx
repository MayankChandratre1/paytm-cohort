import React, { useEffect, useState } from "react";
import api from "../../utils/axios";

const BalanceBox = () => {
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    getBal();
  }, []);

  const getBal = async () => {
    const response = await api.get(
      "http://localhost:3000/api/v1/account/balance"
    );
    setBalance(Number(response.data.balance).toFixed(2));
    console.log(balance);
  };
  return (
    <div className="border border-slate-400 px-4 py-3 rounded-lg">
      <p className="text-slate-400 align-text-bottom">
        Balance:{" "}
        <span className="text-3xl text-black font-semibold">${balance}</span>
      </p>
    </div>
  );
};

export default BalanceBox;
