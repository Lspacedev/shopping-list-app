import "./App.css";
import { useEffect } from "react";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Profile from "./components/Profile";

import DisplayLists from "./components/DisplayLists";
import List from "./components/List";
import Dashboard from "./components/Dashboard";

import ProtectedRoutes from "./components/ProtectedRoute";
import ProtectedRouteReg from "./components/ProtectedRouteReg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  getLoginStatus,
  fetchAllUsers,
  fetchLoggedId,
  fetchSharedLists,
} from "./app/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  let logStat = useSelector((state) => state.users.loginStatus);
  let loginStatus = JSON.parse(localStorage.getItem("loginStatus")) || logStat;

  let loggedUserIdToken = useSelector((state) => state.users.loggedUserId);

  let loggedUserId =
    JSON.parse(localStorage.getItem("loggedUserId")) || loggedUserIdToken;
  useEffect(() => {
    localStorage.setItem("loginStatus", JSON.stringify(loginStatus));
    localStorage.setItem("loggedUserId", JSON.stringify(loggedUserId));
  }, [loginStatus, loggedUserId]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchSharedLists());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLoggedId());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getLoginStatus(loginStatus));
  }, [dispatch]);

  const user = useSelector((state) => state.users.currentUser);

  const submittedSearch =
    useSelector((state) => state.users.submittedSearch?.term) || "";
  const lists = useSelector((state) => state.users.currentUser?.lists) || [];

  const sharedLists = useSelector((state) => state.users.sharedLists) || [];

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route element={<ProtectedRouteReg loginStatus={loginStatus} />}>
            <Route exact path="registration" element={<Registration />} />
            <Route exact path="login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoutes loginStatus={loginStatus} />}>
            <Route path="home" element={<Home />}>
              <Route
                index
                element={
                  <Dashboard
                    count={lists.length}
                    sharedLists={
                      sharedLists &&
                      typeof sharedLists !== "undefined" &&
                      sharedLists.length > 0
                        ? sharedLists
                        : []
                    }
                  />
                }
              />
              <Route path="lists" element={<DisplayLists />}>
                <Route path=":list_name" element={<List />} />
              </Route>
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
