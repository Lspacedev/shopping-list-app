import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { submitSearch, setSearchResults } from "../app/usersSlice";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";


function Searchbar({}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const dispatch = useDispatch();
  function handleSearchChange(e) {
    e.preventDefault();
    if (e.target.value.length === 0) {
      dispatch(submitSearch(""));
      dispatch(setSearchResults([]));
    }
    setSearchInput(e.target.value);
  }
  function handleSearchSubmit(e) {
    e.preventDefault();

    setSearchParams({ q: searchInput });
    dispatch(submitSearch(searchTerm));


  }
  useEffect(() => {
    dispatch(submitSearch(searchTerm));

    console.log({searchTerm, searchParams});

  }, [searchTerm, searchParams]);
 
  return (
    <div className="search-div">
      <div id="search-icon-div">
        <IoIosSearch
          id="search-icon"
          style={{
            fontSize: "1.6rem",
            margin: "0px",
          }}
        />
      </div>
      <input
        type="search"
        placeholder="Search recipes"
        onChange={handleSearchChange}
        value={searchInput}
      />
      <button id="search-btn" onClick={handleSearchSubmit}>
        search
      </button>
    </div>
  );
}

export default Searchbar;
