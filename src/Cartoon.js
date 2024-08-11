import React, { useState } from "react";
import "./Styles/Cartoon.css";
import axios from "axios";

const Cartoon = ({ title, imgUrl, year, review: initialReview, id }) => {
  //props must be written as object in {} --> destructuring

  const defaultImageUrl =
    "https://i.pinimg.com/736x/23/29/4c/23294c4e4bf92e54cad510e1ba1e0554.jpg";

  const [btnText, setBtnText] = useState("Show review");
  const [isShown, setIsShown] = useState(false);
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const [reviewText, setReviewText] = useState("");
  const [review, setReview] = useState(initialReview);

  const handleRemove = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3006/api/cartoons/${id}`
      );
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
      const response = await axios.put(
        `http://localhost:3006/api/cartoons/${id}`,
        { review: reviewText },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const updatedCartoon = response.data; // Podaci iz odgovora
      setReview(updatedCartoon.review); // Ažuriranje stanja sa novom recenzijom
      setReviewText("");
      setIsShown(true);
      setBtnText("Hide review");
    } catch (error) {
      console.log("Error adding review");
    }
  };

  const handleDeleteReview = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3006/api/cartoons/${id}`,{ review: "" }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      setReview("");
      setIsShown(false);
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
