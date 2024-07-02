import { useContext } from "react";
import { AvatarContext } from "../context/AvatarContext";


export const useAvatarContext = () => {
    const context = useContext(AvatarContext);
    if (!context) {
        throw Error("useAvatarContext must be used inside a AvatarContextProvider");
    }
    return context;
};