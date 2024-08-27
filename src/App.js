import "./App.css";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Profile from "./components/Profile";

import DisplayLists from "./components/DisplayLists";
import List from "./components/List";
import Dashboard from "./components/Dashboard";

import useLocalStorage from "./components/useLocalStorage";

import ProtectedRoutes from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import bcrypt from "bcryptjs-react";

import { fetchAllUsers, setSearchResults } from "./app/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App() {
  const [users, setUsers] = useState([]);
  const [registrationStatus, setRegistrationStatus] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  let loginStatus = useSelector((state) => state.users.loginStatus);

  /*let logStat = useSelector((state) => state.users.loginStatus);
  let loginStatus = JSON.parse(localStorage.getItem("loginStatus")) || logStat;

  //let loggedUserIdToken = useSelector((state) => state.users.loggedUserId);
  let currUser = useSelector((state) => state.users.currentUser);
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || currUser;
  //let loggedUserId =
  // JSON.parse(localStorage.getItem("loggedUserId")) || loggedUserIdToken;
  //let user = JSON.parse(localStorage.getItem("loggedUserId")) ||;
  console.log(currUser);
  useEffect(() => {
    localStorage.setItem("loginStatus", JSON.stringify(loginStatus));
    // localStorage.setItem("loggedUserId", JSON.stringify(loggedUserId));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    //console.log(loginStatus, loggedUserId);
  }, [loginStatus, currentUser]);*/

  //navigate({ pathname, search: `?${createSearchParams(params)}` });
  const submittedSearch = useSelector((state) => state.users.submittedSearch);
  const user = useSelector((state) => state.users.currentUser);
  console.log(user);

  useEffect(() => {
    if (submittedSearch.length > 0) {
      let items = [];
      let filteredLists = user.lists.filter((list) => {
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
  }, [submittedSearch]);

  /***  USER FUNCTIONS TO: REGISTER, LOGIN, LOGOUT, UPDATE DETAILS ****/

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route
            exact
            path="registration"
            element={<Registration count={users.length} />}
          />
          <Route
            exact
            path="login"
            element={
              <Login
              //handleLoginSubmit={handleLoginSubmit}
              //loginStatus={loginStatus}
              />
            }
          />

          <Route element={<ProtectedRoutes loginStatus={loginStatus} />}>
            <Route path="home" element={<Home />}>
              {/*<Route
                index
                element={
                  <Dashboard
                    currentUser={currentUser}
                 
                  />
                }
              />*/}
              <Route path="lists" element={<DisplayLists />}>
                <Route
                  path=":list_name"
                  element={
                    <List
                    //lists={currentUser.lists || []}
                    //handleUpdateList={handleUpdateList}
                    //handleListResubmit={handleListResubmit}
                    //handleDeleteList={handleDeleteList}
                    />
                  }
                />
              </Route>
              <Route
                path="profile"
                element={
                  <Profile
                  //currentUser={currentUser}
                  //loggedUserId={loggedUserId}
                  //handleUserUpdate={handleUserUpdate}
                  //handleDeleteAccount={handleDeleteAccount}
                  />
                }
              />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
