import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../app/usersSlice";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    name: "",
    password: "",
  });

  let loginStatus = useSelector((state) => state.users.loginStatus);

  const dispatch = useDispatch();

  //navigation
  const navigation = useNavigate();
  useEffect(() => {
    if (loginStatus === true) {
      //on success redirect user
      navigation("/home");
    }
  }, [navigation, loginStatus]);

  function handleNavigateRegister() {
    navigation("/registration");
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userLogin(loginDetails));
  }

  return (
    <div className="Login">
      <div className="login-form-container">
        <h2>Welcome back!</h2>
        <form>
          <div className="name">
            <label htmlFor="name">
              Username:
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => handleChange(e)}
                value={loginDetails.name}
              />
            </label>
          </div>

          <div className="password">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => handleChange(e)}
                value={loginDetails.password}
              />
            </label>
          </div>

          <input
            type="submit"
            value="Log in"
            onClick={(e) => handleSubmit(e)}
          ></input>
        </form>
        <div className="login-to-register">
          Don't have an account?
          <p onClick={handleNavigateRegister}>Register here</p>
        </div>
      </div>
      <div className="login-img">
        <img src="images/shop.jpg" alt="login" />
      </div>
    </div>
  );
}

export default Login;
