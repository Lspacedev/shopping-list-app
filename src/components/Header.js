import Searchbar from "./Searchbar";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((state) => state.users.currentUser);
  //navigation
  const navigation = useNavigate();
  const { list_name } = useParams();
  const { pathname } = useLocation();

  function handleHamBurgerMenu() {
    const sidebar = document.querySelector(".Sidebar");
    sidebar.classList.toggle("active");
  }
  function handleSearchMenu() {
    const search = document.querySelector(".search-div");
    search.classList.toggle("active");
  }
  function handleNavigateProfile() {
    navigation("/home/profile");
  }
  function getProfilePic(obj) {
    if (obj.profilePic === "") {
      return "/images/avatar.png";
    } else {
      return obj.profilePic;
    }
  }
  return (
    <div className="Header">
      {typeof list_name === "undefined" && pathname !== "/home" ? (
        <Searchbar />
      ) : (
        <div className="search-placeholder"></div>
      )}
      <div className="ham-profile">
        <div className="hamburger-menu" onClick={handleHamBurgerMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="profile-link">
          <div className="search-icon-btn" onClick={handleSearchMenu}>
            <IoIosSearch
              id="profile-search-icon"
              style={{
                fontSize: "1.2rem",
                margin: "0px",
              }}
            />
          </div>
          <div className="header-profile-pic" onClick={handleNavigateProfile}>
            {user && user !== "undefined" && JSON.stringify(user) !== "{}" && (
              <img src={getProfilePic(user)} alt="profile" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
