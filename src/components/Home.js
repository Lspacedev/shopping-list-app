import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import AddList from "./AddList";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers, setSearchResults } from "../app/usersSlice";
import { useState, useEffect } from "react";

function Home() {
  return (
    <div className="Home">
      <Sidebar />
      <div className="Main">
        <Header
        //handleSearchSubmit={handleSearchSubmit}
        //handleSearchChange={handleSearchChange}
        //searchInput={searchInput}
        />
        <div className="cat-add">
          <AddList />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
