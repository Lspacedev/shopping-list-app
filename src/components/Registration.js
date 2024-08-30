import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAddUser } from "../app/usersSlice";
import { useDispatch, useSelector } from "react-redux";

function Registration() {
  const users = useSelector((state) => state.users.usersArr);

  const [userDetails, setUserDetails] = useState({
    id: (users.length + 1).toString(),
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
    const email = document.querySelector("#email");
    const name = document.querySelector("#name");
    const surname = document.querySelector("#surname");
    const password = document.querySelector("#password");

    const isNameEmpty = name.value.trim() !== "";

    const isSurnameEmpty = surname.value.trim() !== "";

    const isPasswordValid = password.value.trim() !== "" && password.value >= 6;

    const isEmailValid = email.value.trim() !== "" && email.validity.valid;

    const isFormValid =
      isEmailValid && isPasswordValid && isNameEmpty && isSurnameEmpty;

    if (isFormValid) {
      dispatch(fetchAddUser(userDetails));
    } else {
      if (name.value.trim() === "") {
        const name_span = document.querySelector(".name > span.error");

        name_span.innerText = "Name cannot be empty";
      }
      if (surname.value.trim() === "") {
        const surname_span = document.querySelector(".surname > span.error");

        surname_span.innerText = "Surname cannot be empty";
      }
      if (password.value.trim() === "") {
        const password_span = document.querySelector(".password > span.error");

        password_span.innerText = "Password cannot be empty";
      }
      if (password.value.length >= 6) {
        const password_span = document.querySelector(".password > span.error");

        password_span.innerText =
          "Password must be not be less than 6 characters";
      }
      if (isEmailValid !== true) {
        const email_span = document.querySelector(".email > span.error");

        email_span.innerText = "Email is not valid";
      }
    }
  }

  return (
    <div className="Registration">
      <div className="register-form-container">
        <h2>Create new account</h2>
        <div className="register-to-login">
          Already have an account?
          <p onClick={handleNavigateLogin}>Login</p>
        </div>
        <div id="error"></div>
        <form action="/" id="register-form">
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
            <span className="error"></span>
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
            <span className="error"></span>
          </div>
          <div className="email">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => handleChange(e)}
                value={userDetails.email}
                required
              />
            </label>
            <span className="error"></span>
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
            <span className="error"></span>
          </div>

          <div className="password">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => handleChange(e)}
                value={userDetails.password}
              />
            </label>
            <span className="error"></span>
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
        <img src="images/shop.jpg" alt="register" />
      </div>
    </div>
  );
}

export default Registration;
