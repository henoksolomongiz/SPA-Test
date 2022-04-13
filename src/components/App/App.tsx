import React, { Fragment, useContext, useEffect } from "react";
import { DataContext } from "../../context/data-context";
import Item from "../Item/Item";
import Search from "../Search/Search";

function App() {
  const { dispatch, state } = useContext(DataContext);
  const move = () => {
    dispatch({
      type: "MOVE",
      payload: "",
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      move();
    }, 1000);
    return () => clearInterval(interval);
  });
  return (
    <Fragment>
      <header>
        <Search />
      </header>
      <main>
        <div className="content">
          {state.data.map((item, index) => {
            return <Item key={index} data={item} />;
          })}
        </div>
      </main>
    </Fragment>
  );
}

export default App;
function dispatch(arg0: { type: string; payload: any }) {
  throw new Error("Function not implemented.");
}
