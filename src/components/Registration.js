import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAddUser } from "../app/usersSlice";
import { useDispatch, useSelector } from "react-redux";

function Registration({ count }) {
  const [userDetails, setUserDetails] = useState({
    id: (count + 1).toString(),
    name: "",
    surname: "",
    email: "",
    cell: "",
    password: "",
    profilePic: "",
    lists: [],
  });

  const dispatch = useDispatch();
  const registrationStatus = useSelector(
    (state) => state.users.registrationStatus
  );

  //navigation
  const navigation = useNavigate();
  useEffect(() => {
    if (registrationStatus) {
      //on success redirect user
      navigation("/login");
    }
  }, [navigation, registrationStatus]);
  function handleNavigateLogin() {
    navigation("/login");
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  }
  function handleImageUpload(e) {
    let input = document.getElementById("profile-pic");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
      setUserDetails({
        ...userDetails,
        profilePic: event.target.result,
      });
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(fetchAddUser(userDetails));
  }

  return (
    <div className="Registration">
      <div className="register-form-container">
        <h2>Create new account</h2>
        <div className="register-to-login">
          Already have an account?
          <p onClick={handleNavigateLogin}>Login</p>
        </div>
        <form>
          <div className="name">
            <label htmlFor="name">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => handleChange(e)}
                value={userDetails.name}
              />
            </label>
          </div>
          <div className="surname">
            <label htmlFor="surname">
              Surname:
              <input
                type="text"
                id="surname"
                name="surname"
                onChange={(e) => handleChange(e)}
                value={userDetails.surname}
              />
            </label>
          </div>
          <div className="email">
            <label htmlFor="email">
              Email:
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => handleChange(e)}
                value={userDetails.email}
              />
            </label>
          </div>
          <div className="cell">
            <label htmlFor="cell">
              Cell:
              <input
                type="text"
                id="cell"
                name="cell"
                onChange={(e) => handleChange(e)}
                value={userDetails.cell}
              />
            </label>
          </div>

          <div className="password">
            <label htmlFor="password">
              Password:
              <input
                type="text"
                id="password"
                name="password"
                onChange={(e) => handleChange(e)}
                value={userDetails.password}
              />
            </label>
          </div>
          <div className="profile-pic">
            <label htmlFor="profile-pic">
              Profile picture:
              <input
                type="file"
                id="profile-pic"
                name="pic"
                onChange={(e) => handleImageUpload(e)}
              />
            </label>
          </div>

          <input
            type="submit"
            value="Register"
            onClick={(e) => handleSubmit(e)}
          ></input>
        </form>
      </div>
      <div className="register-img">
        <img src="images/login-register.jpg" alt="register" />
      </div>
    </div>
  );
}

export default Registration;
