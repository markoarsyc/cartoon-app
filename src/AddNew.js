import React, { useState } from "react";
import "./Styles/AddNew.css";

const AddNew = () => {
  const [cartoon, setCartoon] = useState({ title: "", year: "", imgUrl: "" });

  //controlled form input
  const handleChange = (e) => {
    setCartoon({ ...cartoon, [e.target.name]: e.target.value });
  };

  const addCartoon = async (e) => {
    try {
      const response = await fetch("http://localhost:3006/api/cartoons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartoon),
      });
      if (response.ok) {
        setCartoon({ title: "", year: "", imgUrl: "" }); // Reset the form
      } else {
        console.log("Error: Can not add new cartoon");
      }
    } catch (error) {}
  };

  return (
    <div className="add-new">
      <h2> Add new memory! </h2>
      <form onSubmit={addCartoon}>
        <label htmlFor="TITLE"> Title: </label>
        <input
          type="text"
          id="TITLE"
          name="title"
          value={cartoon.title}
          onChange={handleChange}
        />
        <label htmlFor="YEAR"> Year: </label>
        <input
          type="text"
          id="YEAR"
          name="year"
          value={cartoon.year}
          onChange={handleChange}
        />
        <label htmlFor="IMG"> Image URL: </label>
        <input
          type="text"
          id="IMG"
          name="imgUrl"
          value={cartoon.imgUrl}
          onChange={handleChange}
        />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default AddNew;
