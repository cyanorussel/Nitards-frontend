import { atom } from "recoil";

const getInitialUser = () => {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("user-threads"));
    }
    return null;
};

const userAtom = atom({
    key: "userAtom",
    default: getInitialUser(),
});

export default userAtom;
