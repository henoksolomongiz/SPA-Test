import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/data-context";
import "./search.scss";

const Search = () => {
  const { dispatch } = useContext(DataContext);
  const [search, setSearch] = useState("");
  const dispatchSearch = () => {
    dispatch({
      type: "SEARCH",
      payload: search,
    });
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.length > 3) dispatchSearch();
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);
  return (
    <div className="search">
      <input
        id="search"
        type="text"
        placeholder="Search Band"
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
    </div>
  );
};

export default Search;
