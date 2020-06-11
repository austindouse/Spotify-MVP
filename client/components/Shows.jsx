import React, {useState, useEffect} from "react";
import {Table} from "react-bootstrap";

const Shows = ({currentShows}) => {
  console.log("shows", currentShows);
  return (
    <div>
      {/* <ListGroup variant="flush">
        {currentShows.length
          ? currentShows.map((show) => {
              return (
                <ListGroup.Item>
                  {show.name} - {show._embedded.venue[0].name} -{" "}
                  {show._embedded.venue[0].address.line2} -{" "}
                  {show.dates.start.localDate} -
                  <div>
                    {show.eventUrl ? <a href={show.eventUrl}>Tickets</a> : ""}
                  </div>
                </ListGroup.Item>
              );
            })
          : "No Shows Currently Scheduled"}
      </ListGroup> */}
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Show</th>
              <th>Venue</th>
              <th>Location</th>
              <th>Date</th>
              <th>Tickets</th>
            </tr>
          </thead>
          <tbody>
            {currentShows.length
              ? currentShows.map((show) => {
                  return (
                    <tr>
                      <td>{show.name}</td>
                      <td>{show._embedded.venue[0].name}</td>
                      <td>{show._embedded.venue[0].address.line2}</td>
                      <td>{show.dates.start.localDate}</td>
                      <td>
                        {show.eventUrl ? (
                          <a href={show.eventUrl}>Tickets</a>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  );
                })
              : "no tour scheduled"}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Shows;
