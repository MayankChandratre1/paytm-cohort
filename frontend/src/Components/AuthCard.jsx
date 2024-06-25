import React, { memo, useMemo, useState } from "react";
import { BrowserRouter as Link, useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { useSetRecoilState } from "recoil";
import { signedInUser } from "../store/authAtoms";

const AuthCard = ({ signup }) => {

  const [formdata, setFormdata] = useState({
    username:'',
    firstName:'',
    lastName:'',
    password:''
  })

  const setSignedInUser = useSetRecoilState(signedInUser)

  const navigate = useNavigate()

  const [finalFormData, setFinalFormData] = useState({})

  const handleChange = (e)=>{
    const {name, value} = e.target
    setFormdata({
      ...formdata,
      [name]:value
    })
  }

  const handleSignup = async (e)=>{
      e.preventDefault()
      const {username, firstName, lastName, password} = formdata
      const response = await api.post("http://localhost:3000/api/v1/user/signup",formdata)
      console.log(response.data);
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("username",firstName)
      navigate("/")
  }

  const handleSignin = async (e)=>{
      e.preventDefault()
      const {username, password} = formdata
      const response = await api.post("http://localhost:3000/api/v1/user/signin",{
        username, password
      })
      console.log(response.data);
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("username",username)
      navigate("/")
  }


  return (
    <div>
      <form
        onSubmit={signup ? handleSignup:handleSignin}
        className="flex flex-col justify-center gap-5 p-5 border border-slate-700 rounded-b-xl w-[50vw] transition-all duration-500 ease-linear"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-bold">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="border border-slate-300 text-stone-500 p-2 rounded-md"
            placeholder="JohnDoe@gmail.com"
            required
            onChange={handleChange}
          />
        </div>
        {signup ? (
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="font-bold">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className="border border-slate-300 text-stone-500 p-2 rounded-md"
              placeholder="John"
              required
              onChange={handleChange}
            />
          </div>
        ) : null}
        {signup ? (
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="font-bold">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              className="border border-slate-300 text-stone-500 p-2 rounded-md"
              placeholder="Doe"
              required
              onChange={handleChange}
            />
          </div>
        ) : null}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="border border-slate-300 text-stone-500 p-2 rounded-md"
            required
            onChange={handleChange}
          />
        </div>

        {/* <Link to={"/"}>  */}
        <button
          type="submit"
          className="p-2 bg-slate-800 hover:bg-black text-white rounded-md"
          
        >
          Submit
        </button>
        {/* </Link> */}
      </form>
    </div>
  );
};

export default AuthCard;
