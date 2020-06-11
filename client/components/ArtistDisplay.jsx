import React, {useState, useEffect} from "react";
import Shows from "./Shows";
import Spotify from "spotify-web-api-js";
import {Avatar} from "antd";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import axios from "axios";

const spotifyHelpers = new Spotify();

const ArtistDisplay = ({loggedIn}) => {
  const [topArtists, setTopArtists] = useState([]);
  const [currentShows, setCurrentShows] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const [searchEvent, setSearchEvent] = useState("");

  useEffect(() => {
    if (loggedIn) {
      getUserInfo();
    }
  }, [loggedIn]);

  const getUserInfo = () => {
    spotifyHelpers
      .getMyTopArtists()
      .then((results) => {
        setTopArtists(results.items);
      })
      .catch((err) => {
        console.log("error getting top artists", err);
      });
    spotifyHelpers
      .getMe()
      .then((results) => {
        console.log("results", results);
        setDisplayName(results.display_name);
      })
      .catch((err) => {
        console.log("error getting user info", err);
      });
  };

  const handleChange = (e) => {
    console.log("target", e.target.value);
    setSearchEvent(e.target.value);
  };

  const handleSearch = (searchEvent) => {
    console.log("search event", searchEvent);
    getShows(searchEvent);
    setSearchEvent("");
  };

  const getShows = (artistName) => {
    let artistArray = artistName.split(" ");
    let joinedLower = artistArray.join("-").toLowerCase();

    let url = `http://app.ticketmaster.com/discovery/v1/events.json?keyword=${joinedLower}&apikey=7asn6G0nkCBlzUFAmw8PvPCjOk2pg4J3`;
    axios
      .get(url)
      .then((results) => {
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
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search Events By Keyword"
                aria-label="Search Events By Keyword"
                aria-describedby="basic-addon2"
                type="text"
                onChange={(e) => handleChange(e)}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleSearch(searchEvent)}
                >
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <h3>
              {displayName.length ? `${displayName}'s Top 20 Artists` : ""}
            </h3>
            <Row>
              {topArtists.length
                ? topArtists.map((artist, i) => {
                    let image = artist.images[2].url;
                    return (
                      <Col xs="4">
                        <div key={artist.name} style={{alignItems: "center"}}>
                          <Avatar
                            style={{
                              margin: "15px",
                              cursor: "pointer",
                            }}
                            src={image}
                            size={64}
                            onClick={() => getShows(artist.name)}
                          />
                        </div>
                        <div>{artist.name}</div>
                      </Col>
                    );
                  })
                : ""}
            </Row>
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
