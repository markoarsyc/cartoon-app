import React, { useEffect, useState } from "react";
import Cartoon from "./Cartoon";

const defaultImageUrl = "https://wallpapers.com/images/hd/mickey-and-minnie-disney-phone-qi8gu3icsor9o6fy.jpg";

const CartoonList = () => {
  let [cartoons, setCartoons] = useState([]);

  //ucitavamo crtane iz baze
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3003/cartoons");
        const cartoons = await response.json();
        setCartoons(cartoons);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="cartoon-list">
      {cartoons.map((cartoon) => {
        //all array items (objects) are mapped in React Component because we can not render object
        return (
          <Cartoon
            title={cartoon.title}
            img={cartoon?.img ?? defaultImageUrl}
            year={cartoon.year}
            review={cartoon.review}
            key={cartoon.id}
            cid={cartoon.id}
          />
        );
      })}
    </div>
  );
};

export default CartoonList;
