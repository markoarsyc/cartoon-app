import React, { useState } from "react";

const Cartoon = ({ title, img, year, review, cid }) => {
  //props must be written as object in {} --> destructuring

  let [btnText, setBtnText] = useState("Show review");
  let [isShown, setIsShown] = useState(false);

  return (
    <article className="cartoon">
      <h2> {title} </h2>
      <img src={img} alt={title} />
      <p> {year} </p>
      <div className="options">
        <button
          onClick={() => {
            btnText === "Show review"
              ? setBtnText("Hide review")
              : setBtnText("Show review");
            setIsShown(!isShown);
          }}
        >
          {" "}
          {btnText}{" "}
        </button>
      </div>
      <div className="review">{isShown && <p> {review} </p>}</div>
    </article>
  );
};

export default Cartoon;
