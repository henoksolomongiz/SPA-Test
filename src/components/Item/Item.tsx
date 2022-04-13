import React from "react";
import "./item.scss";

 
const Item = ({ data }: any) => {
  return (
    <div className="card">
      <p>{data}</p>
    </div>
  );
};

export default Item;
