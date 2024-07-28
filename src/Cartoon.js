import React, { useState } from "react";
import "./Styles/Cartoon.css";

const Cartoon = ({ title, img, year, review, cid, onRemove }) => {
  //props must be written as object in {} --> destructuring

  const defaultImageUrl =
    "https://i.pinimg.com/736x/23/29/4c/23294c4e4bf92e54cad510e1ba1e0554.jpg";

  let [btnText, setBtnText] = useState("Show review");
  let [isShown, setIsShown] = useState(false);
  let [imgSrc, setImgSrc] = useState(img || defaultImageUrl);

  const handleRemove = async () => {
    try {
      const response = await fetch(`http://localhost:3003/cartoons/${cid}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onRemove(cid);
      } else {
        console.log("Error removing cartoon");
      }
    } catch (error) {
      console.log("Error removing cartoon");
    }
  };

  return (
    <article className="cartoon">
      <h2> {title} </h2>
      <img
        src={imgSrc}
        alt={title}
        onError={() => setImgSrc(defaultImageUrl)}
      />
      <p> {year} </p>
      <div className="options">
        <button
          className="show-review"
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
        <button className="remove-btn" onClick={handleRemove}>
          Remove
        </button>
      </div>
      <div className="review">{isShown && <p> {review} </p>}</div>
    </article>
  );
};

export default Cartoon;
