import React, { Component } from "react";
import Particles from "react-particles-js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile";
import { postSignInWithoutBodyApi } from "./api/signIn";
import { getProfileApi } from "./api/profile";
import { getImageApi } from "./api/image";
import { postImageUrlApi } from "./api/imageUrl";
import { getSignOutApi } from "./api/signOut";
import "./App.css";

const particlesOptions = {
  //customize this to your liking
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  // route: "home", //for dev only
  // isSignedIn: true, //for dev only
  isSignedIn: false, //for prd only
  isProfileOpen: false, //for prd only
  mounted: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    pet: "",
    age: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      // fetch("https://smart-brain-api-devcoral.herokuapp.com/signin", {
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: token,
      //   },
      // })
      postSignInWithoutBodyApi(token)
        .then((response) => response.json())
        .then((data) => {
          this.getUserProfile(data, token)
            .then((user) => {
              this.setState({ mounted: true });
              this.loadUser(user);
              this.onRouteChange("home");
            })
            .catch((err) => console.log("Unable to get user profile"));
        })
        .catch((error) => {
          if (localStorage.getItem("token")) localStorage.removeItem("token");
          this.setState({ mounted: true });
        });
    } else {
      this.setState({ mounted: true });
    }
  }

  getUserProfile(data, token) {
    if (data?.id != undefined) {
      // return (
      //   fetch(
      //     `https://smart-brain-api-devcoral.herokuapp.com/profile/${data.id}`,
      //     {
      //       method: "get",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: token,
      //       },
      //     }
      //   )

      return getProfileApi(token, data.id)
        .then((response) => response.json())
        .then((user) => {
          if (user.id) {
            return Promise.resolve(user);
          }
        })
        .catch((err) => console.log("Unable to get user profile"));
      // );
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        pet: data.pet,
        age: data.age,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocations = (data) => {
    if (data && data.outputs) {
      return data.outputs[0].data.regions.map((region) => {
        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);
        const clarifaiFace = region.region_info.bounding_box;

        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height,
        };
      });
    }
    return;
  };

  displayFaceBox = (boxes) => {
    if (boxes) this.setState({ boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    const token = localStorage.getItem("token");
    this.setState({ imageUrl: this.state.input });
    // fetch("http://localhost:3000/imageurl", {
    //   method: "post",
    //   headers: { "Content-Type": "application/json", Authorization: token },
    //   body: JSON.stringify({
    //     input: this.state.input,
    //   }),
    // })
    postImageUrlApi(token, this.state.input)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          // fetch("http://localhost:3000/image", {
          //   method: "put",
          //   headers: {
          //     "Content-Type": "application/json",
          //     Authorization: token,
          //   },
          //   body: JSON.stringify({
          //     id: this.state.user.id,
          //   }),
          // })
          getImageApi(token, this.state.user.id)
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocations(response));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      const token = localStorage.getItem("token");
      // return fetch("http://localhost:3000/signout", {
      //   method: "get",
      //   headers: { "Content-Type": "application/json", Authorization: token },
      // })
      return getSignOutApi(token)
        .then((response) => response.json())
        .then((resp) => {
          localStorage.removeItem("token");
          return this.setState({ ...initialState, mounted: true });
        })
        .catch((err) => console.log("Unable to sign out"));
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen,
    }));
  };

  render() {
    const {
      isSignedIn,
      imageUrl,
      route,
      boxes,
      isProfileOpen,
      user,
      mounted,
    } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        {mounted ? (
          <Navigation
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
            toggleModal={this.toggleModal}
          />
        ) : null}
        {isProfileOpen && (
          <Modal>
            <Profile
              isProfileOpen={isProfileOpen}
              toggleModal={this.toggleModal}
              loadUser={this.loadUser}
              user={user}
            />
          </Modal>
        )}
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          mounted ? (
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
              getUserProfile={this.getUserProfile}
            />
          ) : null
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
