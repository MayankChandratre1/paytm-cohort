import { atom, selector } from "recoil";

export const signedInUser = selector({
  key: "signedInUser",
  get: ({ get }) => {
    const user = localStorage.getItem("username");
    return user != "null" ? user : "U";
  },
});
