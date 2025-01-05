import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiViewList } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { userLogout } from "../app/usersSlice";
import { useDispatch, useSelector } from "react-redux";

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
  let loginStatus = useSelector((state) => state.users.loginStatus);

  function handleUserLogout() {
    //localStorage.clear();
    localStorage.removeItem("loggedUserId");
    localStorage.removeItem("loginStatus");
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
          <LuLayoutDashboard className="icon" />
          <p className="text">Dashboard</p>
        </div>

        <div onClick={handleNavigateRecipes}>
          <CiViewList className="icon" />
          <p className="text">Lists</p>
        </div>
        <div onClick={() => handleUserLogout()}>
          <CiLogout className="icon" />
          <p className="text">Logout</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
