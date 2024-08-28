import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiViewList } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { userLogout } from "../app/usersSlice";
import { useDispatch } from "react-redux";

function Sidebar() {
  const dispatch = useDispatch();
  //navigation
  const navigation = useNavigate();
  function handleNavigateRecipes() {
    navigation("/home/lists");
  }
  function handleNavigateHome() {
    navigation("/home");
  }
  function handleUserLogout() {
    localStorage.clear();
    localStorage.removeItem("loggedUserId");
    dispatch(userLogout());
    navigation("/");
  }
  return (
    <div className="Sidebar">
      <h3 className="logo">
        Grocery<span>List</span>
      </h3>
      <div className="sidebar-links">
        <div onClick={handleNavigateHome}>
          <LuLayoutDashboard />
          <p>Dashboard</p>
        </div>

        <div onClick={handleNavigateRecipes}>
          <CiViewList />
          <p>Lists</p>
        </div>
      </div>

      <div className="logout" onClick={() => handleUserLogout()}>
        <CiLogout />
        Logout
      </div>
    </div>
  );
}

export default Sidebar;
