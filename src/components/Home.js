import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import AddList from "./AddList";
import { useSelector } from "react-redux";

function Home() {
  let loginStatus = useSelector((state) => state.users.loginStatus);
  console.log(loginStatus);
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
