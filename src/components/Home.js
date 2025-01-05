import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import AddList from "./AddList";
import { useLocation, useParams } from "react-router-dom";

function Home() {
  const { list_name } = useParams();
  const { pathname } = useLocation();
  return (
    <div className="Home">
      <Sidebar />
      <div className="Main">
        {pathname !== "/home/profile" && <Header />}
        <div className="cat-add">
          {typeof list_name === "undefined" && pathname !== "/home/profile" && (
            <AddList />
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
