import React, { useState } from "react";
import "./Styles/Cartoon.css";

const Cartoon = ({ title, imgUrl, year, review: initialReview, id }) => {
  //props must be written as object in {} --> destructuring

  const defaultImageUrl =
    "https://i.pinimg.com/736x/23/29/4c/23294c4e4bf92e54cad510e1ba1e0554.jpg";

  let [btnText, setBtnText] = useState("Show review");
  let [isShown, setIsShown] = useState(false);
  let [imgSrc, setImgSrc] = useState(imgUrl);
  let [reviewText, setReviewText] = useState("");
  let [review, setReview] = useState(initialReview);

  const handleRemove = async () => {
    try {
      const response = await fetch(`http://localhost:3006/api/cartoons/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Cartoon removed");
      } else {
        console.log("Error removing cartoon");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3006/api/cartoons/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review: reviewText }),
      });
      if (response.ok) {
        const updatedCartoon = await response.json(); // Dodato da se dobije ažurirani objekat
        setReview(updatedCartoon.review); // Ažuriranje stanja sa novom recenzijom
        setReviewText("");
        setIsShown(true);
        setBtnText("Hide review");
      } else {
        console.log("Error adding review");
      }
    } catch (error) {
      console.log("Error adding review");
    }
  };

  const handleDeleteReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3006/api/cartoons/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review: "" }),
      });
      if (response.ok) {
        setReview(""); // Ažuriranje stanja sa praznom recenzijom
        setIsShown(false);
      } else {
        console.log("Error deleting review");
      }
    } catch (error) {
      console.log("Error deleting review");
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
        {review && (
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
        )}
        <form onSubmit={handleRemove}>
          <button className="remove-btn" type="submit">
            Remove cartoon
          </button>
        </form>
      </div>
      <div className="review-prompt">
        <form onSubmit={handleAddReview}>
          <label htmlFor="review">Review:</label>
          <input
            id="review"
            type="text"
            value={reviewText}
            name="review"
            onChange={(e) => {
              setReviewText(e.target.value);
            }}
          />
          <button type="submit">Add review</button>
        </form>
      </div>
      <div className="review">
        {isShown && (
          <div>
            <p> {review} </p>
            {review && (
              <button className="remove-btn" onClick={handleDeleteReview}>
                Delete review
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default Cartoon;
