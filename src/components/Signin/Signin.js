import React from "react";
import "./Signin.css";
import { postSignInApi } from "../../api/signIn";
import { ToastContainer, toast } from "react-toastify";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      disableSubmitBtn: false,
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  saveAuthTokenInSession = (token) => {
    localStorage.setItem("token", token);
  };

  onSubmitSignIn = (e) => {
    this.setState({ disableSubmitBtn: true });
    postSignInApi({
      signInEmail: this.state.signInEmail,
      signInPassword: this.state.signInPassword,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id && data.success === true) {
          this.saveAuthTokenInSession(data.token);
          this.props.getUserProfile(data, data.token).then((user) => {
            this.props.loadUser(user);
            this.props.onRouteChange("home");
          });
        }
      })
      .catch((err) => {
        this.setState({ disableSubmitBtn: false });
        toast.error("Incorrect username and/or password!");
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <ToastContainer />
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                disabled={this.state.disableSubmitBtn}
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
