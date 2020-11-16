import React, { useState, useEffect } from "react";
import { postProfileApi } from "../../api/profile";
import "./Profile.css";

const Profile = ({ isProfileOpen, loadUser, toggleModal, user }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [pet, setPet] = useState("");

  useEffect(() => {
    setName(user.name);
    setAge(user.age);
    setPet(user.pet);
  }, []);

  const onFormChange = (e) => {
    switch (e.target.name) {
      case "user-name":
        setName(e.target.value);
        break;
      case "user-age":
        setAge(e.target.value);
        break;
      case "user-pet":
        setPet(e.target.value);
        break;
      default:
        return;
    }
  };

  const onProfileUpdate = (data) => {
    const token = localStorage.getItem("token");
    // fetch(`http://localhost:3000/profile/${user.id}`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json", Authorization: token },
    //   body: JSON.stringify({ formInput: data }),
    // })
    postProfileApi(token, user.id, data)
      .then((resp) => {
        //304 means response was cached by the browser
        //and it just returns the cached value
        if (resp.status === 200 || resp.status === 304) {
          toggleModal();
          loadUser({ ...user, ...data });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profile-modal">
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="h3 w3 dib"
            alt="avatar"
          />
          <h1>{name}</h1>
          <h4>{`Images Submitted: ${user.entries}`}</h4>
          <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
          <hr />
          <label className="mt2 fw6" htmlFor="user-name">
            Name:
          </label>
          <input
            className="pa2 ba w-100"
            placeholder={name}
            type="text"
            name="user-name"
            id="name"
            onChange={onFormChange}
          />
          <label className="mt2 fw6" htmlFor="user-age">
            Age:
          </label>
          <input
            className="pa2 ba w-100"
            placeholder={age}
            type="text"
            name="user-age"
            id="age"
            onChange={onFormChange}
          />
          <label className="mt2 fw6" htmlFor="user-pet">
            Pet:
          </label>
          <input
            className="pa2 ba w-100"
            placeholder={pet}
            type="text"
            name="user-pet"
            id="pet"
            onChange={onFormChange}
          />
          <div
            className="mt4"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              onClick={() => onProfileUpdate({ name, age, pet })}
              className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
            >
              Save
            </button>
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
              onClick={() => toggleModal()}
            >
              Cancel
            </button>
          </div>
        </main>
        <div>
          <button className="modal-close" onClick={() => toggleModal()}>
            &times;
          </button>
        </div>
      </article>
    </div>
  );
};

export default Profile;
