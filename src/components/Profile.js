import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  fetchAllUsers,
  fetchUpdateUser,
  fetchDeleteUser,
  userLogout,
  fetchResetLoggedId,
} from "../app/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import bcrypt from "bcryptjs-react";
import { useEffect } from "react";

function Profile() {
  const [test, setTest] = useState(false)
  const [userUpdate, setUserUpdate] = useState({
    name: "",
    surname: "",
    email: "",
    cell: "",
    password: "",
    profilePic: "",
  });
  const [update, setUpdate] = useState(false);
  //navigation
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.usersArr);
  const user = useSelector((state) => state.users.currentUser);
  const cuser = useSelector((state) => state.users.currentUser);

  const id = useSelector((state) => state.users.id);

  const usersCopy = [...users];
  const isLoading = useSelector((state) => state.users.isLoading);

  async function handleUpdateUser(obj) {
    if (obj) {
      let updateConfirmation = window.confirm(
        "You are about to update your account information. Continue?"
      );
      if (updateConfirmation) {
        let newUserObj = {
          name: "",
          surname: "",
          email: "",
          cell: "",
          password: "",
          profilePic: "",
        };
        let userCopy = { ...user };

        //*****refactor to switch statement*****
        let encryptedPass;
        if (obj.password) {
          const salt = await bcrypt.genSalt();
          encryptedPass = await bcrypt.hash(obj.password, salt);
        }
        newUserObj.name = obj.name === "" ? userCopy.name : obj.name;
        newUserObj.surname =
          obj.surname === "" ? userCopy.surname : obj.surname;
        newUserObj.email = obj.email === "" ? userCopy.email : obj.email;
        newUserObj.cell = obj.cell === "" ? userCopy.cell : obj.cell;
        newUserObj.password =
          obj.password === "" ? userCopy.password : encryptedPass;
        newUserObj.profilePic =
          obj.profilePic === "" ? userCopy.profilePic : obj.profilePic;
        if (
          !obj.name &&
          !obj.surname &&
          !obj.email &&
          !obj.cell &&
          !obj.password &&
          !obj.profilePic
        ) {
          alert("Error! No update information was entered!");
        } else {
          alert("Account information has been updated");
        }
        ////dispatch the new item to the fetchAdditem function
        dispatch(fetchUpdateUser({ user: newUserObj }));
      }
    }
  }

  function handleDeleteAccount() {
    alert("Account has been deleted");
    let userCopy = { ...user };

    dispatch(fetchDeleteUser(userCopy.id));
    //setTest(false)
    //logout
    dispatch(userLogout());
    localStorage.removeItem("loggedUserId");
    localStorage.removeItem("loginStatus");
    dispatch(fetchResetLoggedId());
    navigation("/");
  }

  function handleSubmit(obj) {
    handleUpdateUser(obj);
    setUpdate(false);
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserUpdate((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUpload(e) {
    let input = document.getElementById("profile-pic2");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
      setUserUpdate({
        ...userUpdate,
        profilePic: event.target.result,
      });
    };
  }
  function getProfilePic(obj) {
    if (obj.profilePic === "") {
      return "/images/avatar.png";
    } else {
      return obj.profilePic;
    }
  }
  return (
    <div className="Profile">
      {isLoading === true ? (
        <div>Loading...</div>
      ) : (
        <div className="contact-details">
          <div className="profile-picture">
            {update ? (
              <div className="profile-pic2">
                <label htmlFor="profile-pic2">
                  Profile picture:
                  <input
                    type="file"
                    id="profile-pic2"
                    name="pic"
                    onChange={(e) => handleImageUpload(e)}
                  />
                </label>
                <button className="close" onClick={() => setUpdate(false)}>
                  x
                </button>
              </div>
            ) : (
              <div className="profile-pic">
                {user && <img src={getProfilePic(user)} alt="profile" />}
              </div>
            )}
          </div>
          <div className="profile-content">
            <h2>Account details</h2>
            <div className="name-div">
              <h4>Name</h4>
              {update ? (
                <div className="name">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    value={userUpdate.name}
                  />
                </div>
              ) : (
                <div>{user && user.name}</div>
              )}
            </div>

            <div className="surname-div">
              <h4>Surname</h4>
              {update ? (
                <div className="surname">
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    onChange={(e) => handleChange(e)}
                    value={userUpdate.surname}
                  />
                </div>
              ) : (
                <div>{user && user.surname}</div>
              )}
            </div>

            <div className="email-div">
              <h4>Email</h4>
              {update ? (
                <div className="email">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    value={userUpdate.email}
                  />
                </div>
              ) : (
                <div>{user && user.email}</div>
              )}
            </div>

            <div className="user-pass">
              <div className="user">
                {/*<h4>Username:</h4>
              {update ? (
                <div>
                  <div className="name">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      onChange={(e) => handleChange(e)}
                      value={userUpdate.username}
                    />
                  </div>
                </div>
              ) : (
                <div>{username}</div>
              )}*/}
              </div>

              <div className="pass">
                <h4>Password:</h4>
                {update ? (
                  <div>
                    <div className="password">
                      <input
                        type="text"
                        id="password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                        value={userUpdate.password}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="password-text">{user && user.password}</div>
                )}
              </div>
            </div>
            <div className="account-delete-update">
              <button
                onClick={() =>
                  update ? handleSubmit(userUpdate) : setUpdate(true)
                }
              >
                {update ? "Submit" : "Update"}
              </button>

              <button id="account-delete" onClick={handleDeleteAccount}>
                Delete my account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Profile;
