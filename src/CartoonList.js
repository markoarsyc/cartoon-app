import React, { useEffect, useState } from "react";
import Cartoon from "./Cartoon";
import AddNew from "./AddNew";

const defaultImageUrl = "https://i.pinimg.com/736x/23/29/4c/23294c4e4bf92e54cad510e1ba1e0554.jpg";

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

  //uklonjen crtani iz baze odmah uklanje i iz liste za prikaz
  const handleRemove = (cid)=> {
    setCartoons(cartoons.filter(cartoon => cartoon.id !== cid));
  }

  //dodati crtani se odmah prikazuje
  const handleAdd = (newCartoon)=> {
    setCartoons([...cartoons,newCartoon]);
  }

  return (
    <>
    <AddNew onAdd={handleAdd}/>
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
            onRemove={handleRemove}
          />
        );
      })}
    </div>
    </>
  );
};

export default CartoonList;
