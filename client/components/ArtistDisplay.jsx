import React, {useState, useEffect} from "react";
import Shows from "./Shows";
import Spotify from "spotify-web-api-js";
import {Avatar} from "antd";
import {Container, Row, Col} from "react-bootstrap";
import axios from "axios";

const spotifyHelpers = new Spotify();

const ArtistDisplay = ({loggedIn}) => {
  const [topArtists, setTopArtists] = useState([]);
  const [currentShows, setCurrentShows] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      getUserInfo();
    }
  }, [loggedIn]);

  const getUserInfo = () => {
    spotifyHelpers.getMyTopArtists().then((results) => {
      setTopArtists(results.items);
    });
  };

  const getShows = (artistName) => {
    let artistArray = artistName.split(" ");
    let joinedLower = artistArray.join("-").toLowerCase();

    let url = `http://app.ticketmaster.com/discovery/v1/events.json?keyword=${joinedLower}&apikey=7asn6G0nkCBlzUFAmw8PvPCjOk2pg4J3`;
    axios
      .get(url)
      .then((results) => {
        console.log("events", results.data._embedded);
        if (results.data._embedded) {
          setCurrentShows(results.data._embedded.events);
        } else {
          setCurrentShows([]);
        }
      })
      .catch((err) => {
        console.log("error getting shows", err);
      });
  };

  if (loggedIn) {
    return (
      <Container fluid>
        <Row>
          <Col>
            <div>
              {topArtists.length
                ? topArtists.map((artist) => {
                    let image = artist.images[2].url;
                    return (
                      <div key={artist.name}>
                        <Avatar
                          style={{margin: "5px", cursor: "pointer"}}
                          src={image}
                          size={64}
                          onClick={() => getShows(artist.name)}
                        />
                        <div>{artist.name}</div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </Col>
          <Col>
            <div>
              <Shows currentShows={currentShows} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return "";
  }
};

export default ArtistDisplay;
