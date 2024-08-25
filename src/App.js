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

import { fetchAllUsers } from "./app/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";



function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useLocalStorage("current", {});
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [submittedSearch, setsubmittedSearch] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const userss = useSelector((state) => state.users.usersArr);
  let loginStatus = useSelector((state) => state.users.loginStatus);

  console.log("thunking good", userss)

  /*useEffect(() => {
    const usersCopy = users.slice(0);
    const foundUser = usersCopy.find(
      (user) => user.name === currentUser.name
    );
    if (foundUser) {
      foundUser.lists = currentUser.lists.slice(0);
    }

    setUsers(usersCopy);
  }, [currentUser]);*/
/*
  useEffect(() => {
    if (submittedSearch.length > 0) {
      let filteredLists = currentUser.lists.filter(
        (list) =>
          list.listName
            .toLowerCase()
            .match(submittedSearch.toLowerCase()) ||
          list.category.toLowerCase().match(submittedSearch.toLowerCase())
      );
      setSearchResults(filteredLists);
    }
    return () => {
      setSearchResults([]);
    };
  }, [submittedSearch]);*/

  /***  USER FUNCTIONS TO: REGISTER, LOGIN, LOGOUT, UPDATE DETAILS ****/

  async function handleRegistrationSubmit(obj) {
    //check if user exists
    const filteredUser = users.filter((user) => user.name === obj.name);
    if (filteredUser.length > 0) {
      alert("user already exists");
    } else if (obj.name === "" || obj.password === "") {
      alert("no user info");
    } else {
      alert("Account created.");
      const salt = await bcrypt.genSalt();
      obj.password = await bcrypt.hash(obj.password, salt);

      fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }).then(() => console.log("user added to database"));

      setUsers((prev) => [...prev, obj]);
      setRegistrationStatus(true);
    }
  }
/*
  function handleLoginSubmit(obj) {

    const findUser = users.filter((user) => user.name === obj.name);
    if (findUser.length > 0) {
      let [user] = findUser;
      bcrypt.compare(obj.password, user.password).then((res) => {
        if (res === true) {
          setLoginStatus(true);

          setCurrentUser(user);
        } else {
          alert("invalid login password");
        }
      });
    } else {
      alert("user does not exist");
    }
  }*/
/*
  async function handleUserUpdate(obj) {
    const userCopy = { ...currentUser };

    if (obj.name) {
      userCopy.name = obj.name;
    }

    if (obj.surname) {
      userCopy.surname = obj.surname;
    }

    if (obj.email) {
      userCopy.email = obj.email;
    }

    if (obj.cell) {
      userCopy.cell = obj.cell;
    }

    if (obj.password) {
      userCopy.password = obj.password;
      const salt = await bcrypt.genSalt();
      userCopy.password = await bcrypt.hash(userCopy.password, salt);
    }

   

    fetch(`http://localhost:8000/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCopy),
    })
      .then((response) => response.json())
      .then((user) => console.log(user, "user information has been updated"));

    setCurrentUser(userCopy);
  }

  function handleDeleteAccount() {
    alert("You are about to delete your account. Continue?");
    const filteredUsers = users.filter((user) => user.id !== currentUser.id);

    //update database
    fetch(`http://localhost:8000/users/${currentUser.id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => console.log("User deleted"));
    //update state
    setUsers(filteredUsers);
    //logout
    setLoginStatus(false);
  }

  function handleLogOut() {
    const usersCopy = users.slice(0);
    const foundUser = usersCopy.find((user) => user.id === currentUser.id);

    if (foundUser) {
      foundUser.id = currentUser.id;
      foundUser.name = currentUser.name;
      foundUser.surname = currentUser.surname;
      foundUser.email = currentUser.email;

      foundUser.cell = currentUser.cell;
      foundUser.password = currentUser.password;
      foundUser.lists = currentUser.lists.slice(0);
      setUsers(usersCopy);
    }

    setLoginStatus(false);
  }

  /***  USER FUNCTIONS TO: ADD, DELETE, UPDATE listS ****/
/*
  function handleAddList(obj) {
    //find list
    const filteredList = currentUser.lists.filter(
      (list) => list.listName === obj.listName
    );

    //if list doesn't exist add it
    if (filteredList.length === 0) {
      let updatedUser = { ...currentUser };
      updatedUser.lists = [...updatedUser.lists, obj];

      //lists array to update database
      let lists = updatedUser.lists;

      fetch(`http://localhost:8000/users/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lists }),
      })
        .then((response) => response.json())
        .then((user) => console.log(user, "added list to database"));

      //update state
      setCurrentUser((prev) => ({ ...prev, lists: [...prev.lists, obj] }));
    }
  }

  function handleDeleteList(name) {
    const filteredLists = currentUser.lists.filter(
      (list) => list.listName !== name
    );

    let lists = filteredLists;
    fetch(`http://localhost:8000/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lists }),
    })
      .then((response) => response.json())
      .then((user) => console.log(user, "list has been deleted"));

    //update state
    setCurrentUser((prev) => ({ ...prev, lists: filteredLists }));
  }

  function handleUpdateList(name) {
    const listsCopy = currentUser.lists.slice(0);
    let list = listsCopy.find((list) => list.listName === name);
    list.edit = true;

    setCurrentUser((prev) => ({ ...prev, lists: listsCopy }));
  }

  function handleListResubmit(name, obj) {
    const listsCopy = currentUser.lists.slice(0);
    let list = listsCopy.find((list) => list.listName === name);
    //*****refactor to switch statement*****
    if (obj.listName) {
      list.listName = obj.listName;
    }
    if (obj.quantity) {
      list.quantity = obj.quantity;
    }
    if (obj.category) {
      list.category = obj.category;
    }
    if (obj.notes) {
      list.notes = obj.notes;
    }
 

    list.edit = false;
    //lists array to update database
    let lists = listsCopy;
    fetch(`http://localhost:8000/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lists }),
    })
      .then((response) => response.json())
      .then((user) => console.log(user, "list has been updated"));

    //update state
    setCurrentUser((prev) => ({ ...prev, lists: listsCopy }));
  }


  function handleSearchChange(e) {
    e.preventDefault();
    if (e.target.value.length === 0) {
      setsubmittedSearch("");
    }
    setSearchInput(e.target.value);
  }
  function handleSearchSubmit() {
    setsubmittedSearch(searchInput);
  }
  */

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route
            exact
            path="registration"
            element={
              <Registration
                count={users.length}
                handleRegistrationSubmit={handleRegistrationSubmit}
                registrationStatus={registrationStatus}
              />
            }
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
            <Route
              path="home"
              element={
                <Home
              
                />
              }
            >

              {/*<Route
                index
                element={
                  <Dashboard
                    currentUser={currentUser}
                 
                  />
                }
              />*/}
              <Route
                path="lists"
                element={
                  <DisplayLists
                    searchResults={[]}
                  />
                }
              >
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
             {/* <Route
                path="profile"
                element={
                  <Profile
                    name={currentUser.name}
                    surname={currentUser.surname}
                    email={currentUser.email}
                    username={currentUser.cell}
                    password={currentUser.password}
                 
                    handleUserUpdate={handleUserUpdate}
                    handleDeleteAccount={handleDeleteAccount}
                  />
                }
              />*/}
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
