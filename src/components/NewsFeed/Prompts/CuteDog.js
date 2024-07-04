import React from "react";
import "./CuteDog.scss";

const CuteDog = ({ openModal }) => {
  return (
    <>
      <button class="btn-dog btn-like" onClick={openModal}>
        <div class="heart"></div>
      </button>
      <button class="btn-dog btn-dislike">
        <div class="heart"></div>
      </button>
      <div class="wrapper">
        <div class="card-container">
          <div class="dog">
            <div class="head">
              <div class="ears"></div>
              <div class="face"></div>
              <div class="eyes">
                <div class="teardrop"></div>
              </div>
              <div class="nose"></div>
              <div class="mouth">
                <div class="tongue"></div>
              </div>
              <div class="chin"></div>
            </div>
            <div class="body">
              <div class="tail"></div>
              <div class="legs"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CuteDog;
