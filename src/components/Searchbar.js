import { IoIosSearch } from "react-icons/io";

function Searchbar({ handleSearchSubmit, handleSearchChange, searchInput }) {
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
