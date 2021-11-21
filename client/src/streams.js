import React, { useState, useEffect } from 'react';
import './index.css';
import api from './api'
import { Container } from 'react-bootstrap';

import "./index.css";

function Streams() {

  const [channels, setChannels] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get('https://api.twitch.tv/helix/streams');
      let dataArray = result.data.data;

      let gameIDs = dataArray.map((stream) => {
        return stream.game_id;
      });
      console.log(gameIDs);

      let baseURL = "https://api.twitch.tv/helix/games?";
      let queryParams = "";
      gameIDs.map((id) => {
        queryParams = queryParams + `id=${id}&`
        return queryParams;
      });

      let finalURL = baseURL + queryParams;
      let gameNames = await api.get(finalURL);
      let gameNameArray = gameNames.data.data;

      let finalArray = dataArray.map((stream) => {
        stream.gameName = "";
        gameNameArray.map((name) => {
          if (stream.game_id === name.id) {
            stream.gameName = name.name;
            return stream.gameName;
          }
        });
        let newURL = stream.thumbnail_url
          .replace("{width}", "420")
          .replace("{height}", "240");
        stream.thumbnail_url = newURL;
        return stream;
      });
      setChannels(finalArray);
      console.log(channels);
    };
    fetchData();
  }, []);


  return (
    <Container>
      <div className='row'>
        {channels.map((channel) => (
          <div className='col-lg-3 col-md-4 col-sm-8 mt-2'>
            <div className='card'>
              <img className='card-img-top' src={channel.thumbnail_url}></img>
              <div className='card-img-overlay text-light'>
                <p className='card-text '>{channel.gameName}</p>
              </div>
              <div class='card-footer'>
                {channel.user_name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Streams;