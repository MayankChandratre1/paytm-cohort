import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import api from "../../utils/axios";

const SendMoney = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const name = params.get("name");
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="h-screen grid place-items-center">
        <div className="w-[50%]">
          <button
            className="py-2 px-2 my-3 text-xl underline"
            onClick={() => navigate("/")}
          >
            &larr; back
          </button>
          <div className="w-full flex flex-col gap-5 items-strech p-5 border border-slate-400 rounded-lg shadow-lg">
            <p className=" w-full text-2xl font-bold text-center">Send Money</p>
            <p className=" flex gap-2 items-baseline text-2xl">
              <span className="w-10 h-10 grid place-items-center rounded-full bg-green-400 text-white text-lg">
                {name.toUpperCase().charAt(0)}
              </span>{" "}
              {name.toUpperCase()}
            </p>
            <SendBox id={id} />
          </div>
        </div>
      </div>
    </>
  );
};

const SendBox = ({ id }) => {
  const [amount, setAmount] = useState(0);
  const [reqState, setReqState] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setReqState("");
  };

  const transfer = async () => {
    try {
      const response = await api.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount,
        }
      );
      setReqState(response.data.msg);
    } catch (err) {
      setReqState(err.response.data.msg);
    }
  };
  return (
    <div>
      <p>
        Amount (<i>In dollars</i>)
      </p>
      <input
        type="number"
        required
        className="block px-3 py-2 border border-slate-400 w-full rounded-md font-mono inner-spin-button-none"
        placeholder="100"
        onChange={handleChange}
      />
      <p
        className={`${
          reqState == "Transfer Successfull" ? "text-green-400" : "text-red-600"
        } text-xs px-3 py-3`}
      >
        {reqState != "" ? reqState : null}
      </p>
      <button
        className="w-full px-3 py-2 bg-green-500 text-white rounded-md mt-2"
        onClick={transfer}
      >
        Send
      </button>
    </div>
  );
};

export default SendMoney;
