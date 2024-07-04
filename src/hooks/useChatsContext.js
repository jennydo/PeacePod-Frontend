import { ChatsContext } from "../context/ChatsContext";
import { useContext } from "react";

export const useChatsContext = () => {
    const context = useContext(ChatsContext);
    if (!context) {
        throw Error("useChatsContext must be used inside a ChatsContextProvider");
    }
    return context;
};