import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import { useRecoilValue } from "recoil";
import { signedInUser } from "../store/authAtoms";
import { useNavigate } from "react-router-dom";

const UsersBox = () => {
  const [filter, setFilter] = useState("");
  const [bulk, setBulk] = useState([]);
  const signedInUsername = useRecoilValue(signedInUser);

  useEffect(() => {
    getUserList(filter);
  }, [filter]);

  const getUserList = async (filter) => {
    const response = await api.get(
      "http://localhost:3000/api/v1/user/bulk?filter=" + filter
    );
    setBulk(response.data);
    console.log(bulk);
  };

  return (
    <div className="my-5">
      <p className="font-bold">Users</p>
      <FilterBox setFilter={setFilter} />
      <div>
        {bulk
          ? bulk.users?.map((user) =>
              signedInUsername != user.firstName ? (
                <User key={user.username} user={user} />
              ) : null
            )
          : null}
      </div>
    </div>
  );
};

const FilterBox = ({ setFilter }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    setFilter(value.toLowerCase());
  };

  return (
    <div className="my-2 ">
      <input
        className="w-full px-3 py-1 border border-slate-400 rounded-md"
        type="text"
        placeholder="/ Search user"
        onChange={handleChange}
      />
    </div>
  );
};

const User = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = (name, id) => {
    navigate("/send?id=" + id + "&name=" + name);
  };
  return (
    <div className="flex justify-between my-2 items-center">
      <p className="p-2 flex gap-2 items-baseline">
        <span className="w-10 h-10 grid place-items-center rounded-full bg-slate-400">
          {user.username.toUpperCase().charAt(0)}
        </span>{" "}
        {user.firstName.toUpperCase() + " " + user.lastName.toUpperCase()}
      </p>

      <button
        className="px-3 py-2 bg-slate-800 text-slate-100 text-xs rounded-md font-semibold hover:bg-slate-400"
        onClick={() =>
          handleClick(user.firstName + " " + user.lastName, user._id)
        }
      >
        Send Money
      </button>
    </div>
  );
};

export default UsersBox;
