import { SpotifyContext } from "../context/SpotifyContext";
import { useContext } from "react";

export const useSpotifyContext = () => {
    const context = useContext(SpotifyContext);
    if (!context) {
        throw Error("useSpotifyContext must be used inside a SpotifyContextProvider");
    }
    return context;
};