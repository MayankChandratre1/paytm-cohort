import { selector } from "recoil";
import api from "../../utils/axios";
import { signedInUser } from "./authAtoms";

export const userListAtom = selector({
    key:"userListAtom",
    get:async ({get}) =>{
        const user = get(signedInUser)
        if(user){
            const response = await api.get("http://localhost:3000/api/v1/user/bulk")
            return response.data
        }
        return null
    }
})