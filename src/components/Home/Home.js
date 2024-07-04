import React from "react";
import "./Home.css";
import BouncyText from "./BouncyText";
import { NavCards } from "./NavCards";

const Home = () => {
  return (
    <div className="homepage">
      {/* App name */}
      <div className="app-name__container">
        <BouncyText text={"PeacePod"} />
        <div className="app-intro__container">
          <h1>Bridging gaps, healing minds</h1>
          <p className="app-intro__description">
            ❤️‍🩹Welcome to a gentle space for your heart and mind. Share your story
            with a caring listener or enjoy a soothing meditation made just for
            you. Here, healing unfolds at your own pace.❤️‍🩹
          </p>
        </div>
      </div>
      <NavCards />
    </div>
  );
};

export default Home;
