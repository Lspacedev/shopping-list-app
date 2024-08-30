import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import AddList from "./AddList";



function Home() {


  return (
    <div className="Home">
      <Sidebar />
      <div className="Main">
        <Header
     
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
