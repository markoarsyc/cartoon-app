import React, { useState } from "react";
import "./Styles/AddNew.css";

const AddNew = ({onAdd}) => {
  const [cartoon, setCartoon] = useState(
    {title:'', year:"",img:""}
  );

  //controlled form input
  const handleChange = (e) => {
    setCartoon({...cartoon, [e.target.name] : e.target.value});
  }

  //adding new cartoon
  const handleSubmit = async (e) =>  {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3003/cartoons",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartoon)
      });
      if (response.ok) {
        onAdd(await response.json());
        setCartoon({ title: "", year: "", img: "" }); // Reset the form
      } else {
        console.log("Error: Can not add new cartoon");
      }
    } catch (error) {
      console.error("Error adding cartoon:", error);
    }

    
  }

  return (
    <div className="add-new">
      <h2> Add new memory! </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="TITLE"> Title: </label>
        <input type="text" id="TITLE" name="title" value={cartoon.title} onChange={handleChange}/>
        <label htmlFor="YEAR"> Year: </label>
        <input type="text" id="YEAR" name="year" value={cartoon.year} onChange={handleChange}/>
        <label htmlFor="IMG"> Image URL: </label>
        <input type="text" id="IMG" name="img" value={cartoon.img} onChange={handleChange}/>
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default AddNew;
