import { useState } from "react";

function Profile({
  name,
  surname,
  email,
  username,
  password,
  profilePic,
  handleUserUpdate,
  handleDeleteAccount,
}) {
  const [userUpdate, setUserUpdate] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    profilePic: "",
  });
  const [update, setUpdate] = useState(false);

  function handleSubmit(obj) {
    handleUserUpdate(obj);
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

  return (
    <div className="Profile">
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
            </div>
          ) : (
            <div className="profile-pic">
              {profilePic && <img src={profilePic} alt="profile" />}
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
              <div>{name}</div>
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
              <div>{surname}</div>
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
              <div>{email}</div>
            )}
          </div>

          <div className="user-pass">
            <div className="user">
              <h4>Username:</h4>
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
              )}
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
                <div className="password-text">{password}</div>
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
    </div>
  );
}
export default Profile;
