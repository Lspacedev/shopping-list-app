import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <nav>
        <div className="logo-land">
          Grocery <span>List</span>
        </div>
        <div className="login-register">
          <Link to="login">
            <button className="login-btn">Log in</button>
          </Link>
          <Link to="registration">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      </nav>
      <div className="landing-content">
        <div className="landing-info">
          <div className="landing-title">Keep track of your shopping lists</div>
          <div className="landing-subtitle">
            Managing your groceries with shopping lists.
          </div>
          <Link to="/registration">
            <button className="register-btn2">Register Now</button>
          </Link>
        </div>
        <div className="landing-img">
          <img src="images/landing.jpg" alt="landing" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
