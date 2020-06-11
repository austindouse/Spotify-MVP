import React, {Component} from "react";

const LoginButton = ({loggedIn}) => {
  if (!loggedIn) {
    return (
      <div>
        <div className="d-flex justify-content-center align-items-center">
          {" "}
          <a href="http://3.134.247.25:8888/login">
            <button type="button" className="btn btn-dark">
              Login With Spotify
            </button>
          </a>
        </div>
      </div>
    );
  } else {
    return "";
  }
};

export default LoginButton;
