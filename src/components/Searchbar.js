import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAllUsers,
  submitSearch,
  submitSort,
  setSearchResults,
  fetchSharedLists,
} from "../app/usersSlice";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Searchbar({}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const dispatch = useDispatch();


  function handleSearchChange(e) {
    e.preventDefault();
    if (e.target.value.length === 0) {
      dispatch(submitSearch(""));
      dispatch(setSearchResults([]));
    }

    setSearchParams({ search: e.target.value });
  }

  function handleSearchSubmit(e) {
    e.preventDefault();

    //setSearchParams({ q: searchInput });
    dispatch(submitSearch(searchTerm));
  }
  const submittedSort =
    useSelector((state) => state.users.submittedSort?.term) || "";
  const submittedSearch =
    useSelector((state) => state.users.submittedSearch?.term) || "";

  const lists = useSelector((state) => state.users.currentUser?.lists) || [];
  const isLoading = useSelector((state) => state.users.isLoading);
  console.log(searchTerm);

  useEffect(() => {
    if (typeof lists !== "undefined" && lists.length > 0) {
      dispatch(submitSearch(searchTerm));
    }
  }, [lists, dispatch]);

  useEffect(() => {
    if (submittedSearch.length > 0) {

      let items = [];
      let filteredLists = lists.filter((list) => {
        let filteredItems = list.items.filter((item) => {
          return (
            item.itemName.toLowerCase().match(submittedSearch.toLowerCase()) ||
            item.category.toLowerCase().match(submittedSearch.toLowerCase())
          );
        });

        items.push(filteredItems);
      });

      dispatch(setSearchResults(items.flat()));
    }

    return () => {
      //setSearchResults([]);
    };
  }, [submittedSearch,submittedSort, dispatch]);

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
        value={searchTerm}
      />
      <button id="search-btn" onClick={handleSearchSubmit}>
        search
      </button>
    </div>
  );
}

export default Searchbar;
