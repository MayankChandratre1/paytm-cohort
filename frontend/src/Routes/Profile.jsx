import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import { useSetRecoilState } from "recoil";
import { signedInUser } from "../store/authAtoms";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import BalanceBox from "../Components/BalanceBox";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });

  const [reload, setReload] = useState(false);

  const getUser = async () => {
    const response = await api.get(
      "http://localhost:3000/api/v1/user/bulk?filter=" +
        localStorage.getItem("username")
    );
    setUser(response.data?.users[0]);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mt-14 px-5 py-5">
        <ProfileCard user={user} />
        <UpdateCard user={user} />
      </div>
    </div>
  );
};

const UpdateCard = ({ user }) => {
  const [formdata, setFormdata] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();

  useEffect(
    () =>
      setFormdata({
        username: user?.username,
        firstName: user?.firstName,
        lastName: user?.lastName,
      }),
    [user]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
    console.log(formdata);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { username, firstName, lastName, password } = formdata;
    const response = await api.put(
      "http://localhost:3000/api/v1/user/update",
      formdata,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(response.data);
    localStorage.setItem("username", firstName);
    navigate("/profile");
  };

  return (
    <div className="">
      <p className="font-bold mb-2 p-3 text-2xl">Edit Your profile</p>
      <form
        onSubmit={handleUpdate}
        className="flex flex-col justify-center gap-5 p-5 border border-slate-700 rounded-xl w-[50vw]"
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
            value={formdata.username}
          />
        </div>

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
            value={formdata.firstName}
          />
        </div>

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
            value={formdata.lastName}
          />
        </div>

        {/* <Link to={"/"}>  */}
        <button
          type="submit"
          className="p-2 bg-slate-800 hover:bg-black text-white rounded-md"
        >
          Update Profile
        </button>
        {/* </Link> */}
      </form>
    </div>
  );
};

const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("username", null);
    navigate("/signup");
  };

  return (
    <button
      type="submit"
      className="p-2 bg-red-500 hover:bg-red-800 text-white rounded-md"
      onClick={() => logout()}
    >
      Logout
    </button>
  );
};

const ProfileCard = ({ user }) => {
  return (
    <div className="mb-5">
      <div className="flex justify-between p-3 items-center">
        <p className="text-xl font-bold">
          {user?.firstName?.toUpperCase() + " " + user?.lastName?.toUpperCase()}
          <span className="text-sm text-slate-400 ml-2 font-thin">
            {user?.username}
          </span>
        </p>

        <LogoutButton />
      </div>
      <BalanceBox />
    </div>
  );
};
export default Profile;
