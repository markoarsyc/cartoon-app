import React, { useEffect, useState } from "react";
import Cartoon from "./Cartoon";
import AddNew from "./AddNew";
import "./Styles/CartoonList.css"

const CartoonList = () => {
  let [cartoons, setCartoons] = useState([]);

  useEffect(()=>{
    const fetchData = async ()=> {
      try {
        const response = await fetch("http://localhost:3006/api/cartoons");
        const cartoons = await response.json();
        setCartoons(cartoons);
        console.log(cartoons);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  },[]);

  return (
    <>
      <AddNew/>
      <div className="cartoon-list">
        {cartoons.map((cartoon) => {
          //all array items (objects) are mapped in React Component because we can not render object
          return (
            <Cartoon
              title={cartoon.title}
              imgUrl={cartoon.imgUrl}
              year={cartoon.year}
              review={cartoon.review}
              key={cartoon._id}
              id = {cartoon._id}
            />
          );
        })}
      </div>
    </>
  );
};

export default CartoonList;
