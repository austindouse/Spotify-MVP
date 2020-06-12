import React, {Component} from "react";
import {Row, Col, Container} from "react-bootstrap";
import Spotify from "spotify-web-api-js";
import LoginButton from "./LoginButton";
import ArtistDisplay from "./ArtistDisplay";
import "../App.css";

const spotifyHelpers = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
    };
    if (params.access_token) {
      spotifyHelpers.setAccessToken(params.access_token);
    }
    // this.getUserInfo = this.getUserInfo.bind(this);
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

  render() {
    return (
      <div style={{paddingTop: "15px"}}>
        <LoginButton loggedIn={this.state.loggedIn} />
        <Container fluid>
          <Row>
            <Col>
              <ArtistDisplay loggedIn={this.state.loggedIn} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
