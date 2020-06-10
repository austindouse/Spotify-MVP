import React, {Component} from "react";
import Spotify from "spotify-web-api-js";
import "../App.css";

const spotifyHelpers = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      response: "",
    };
    if (params.access_token) {
      spotifyHelpers.setAccessToken(params.access_token);
    }
    this.getUserInfo = this.getUserInfo.bind(this);
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getUserInfo() {
    spotifyHelpers.getMyTopArtists().then((results) => {
      this.setState({
        response: results,
      });
    });
  }
  render() {
    return (
      <div>
        <a href="http://localhost:8888">
          <button>Login In With Spotify!</button>
        </a>
        <button onClick={() => this.getUserInfo()}>
          Click for response hopefully!
        </button>
        <div>Get Other Info: {this.state.response}</div>
      </div>
    );
  }
}

export default App;
