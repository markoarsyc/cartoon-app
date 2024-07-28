import React, { useState, useEffect } from "react";
import "./Styles/AddNew.css";

const AddNew = () => {
  const [cartoon, setCartoon] = useState(
    {title:'', year:"",img:""}
  );
  const [cartoons,setCartoons] = useState([]);

  const handleChange = (e) => {
    setCartoon({...cartoon, [e.target.name] : e.target.value});
  }

  const handleSubmit = (e) =>  {
    e.preventDefault();
    setCartoons((prevCartoons)=>{
      const updatedCartoons = [...prevCartoons,cartoon];
      console.log(updatedCartoons);
      return updatedCartoons;
    });
    
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./cartoons.json");
        const cartoons = await response.json();
        setCartoons(cartoons);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
