import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
import Auth from "../Routes/Auth";
import Home from "../Routes/Home";
import { useRecoilValue } from "recoil";
import { signedInUser } from "../store/authAtoms";

const Navbar = () => {
  const signedInUsername = useRecoilValue(signedInUser);
  const navigate = useNavigate();

  // console.log(signedInUsername)
  return (
    <>
      <header className="fixed top-0 bg-black text-white w-full px-4 py-3 flex justify-between shadow-lg">
        <div className="text-2xl font-semibold">Paytm</div>
        <div className="flex gap-5">
          <button
            className="w-8 h-8 bg-slate-400 rounded-full hover:bg-slate-500"
            onClick={() => navigate("/profile")}
          >
            {signedInUsername?.toUpperCase().charAt(0)}
          </button>
          {signedInUsername === "U" ? (
            <button className="underline px-2 hover:bg-slate-200 hover:bg-opacity-20 rounded-md">
              <Link to={"/signup"}>SignUp</Link>
            </button>
          ) : null}
          <button className="underline px-2 hover:bg-slate-200 hover:bg-opacity-20 rounded-md">
            <Link to={"/"}>Home</Link>
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
