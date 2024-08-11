import React, { useEffect, useState } from "react";
import Cartoon from "./Cartoon";
import AddNew from "./AddNew";
import "./Styles/CartoonList.css";
import axios from "axios";

const CartoonList = () => {
  const [cartoons, setCartoons] = useState([]);

  const getCartoons = async ()=> {
    try {
      const response = await axios.get("http://localhost:3006/api/cartoons");
      setCartoons(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=>{
    getCartoons();
  },[])

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
