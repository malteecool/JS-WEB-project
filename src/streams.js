import React, {useState, useEffect} from 'react';
import './index.css';
import api from './api'
import { Button } from 'bootstrap';

function Streams() {

    const [channels, setChannels] = useState([])    

    useEffect(() => {
        const fetchData = async () => {
          const result = await api.get('https://api.twitch.tv/helix/streams');
          let dataArray = result.data.data; 
          //console.log(dataArray);
          
          let gameIDs = dataArray.map((stream) => {
            return stream.game_id;
          });
          console.log(gameIDs);
          
          let baseURL = "https://api.twitch.tv/helix/games?";
          let queryParams = "";
          gameIDs.map((id) => {
            return (queryParams = queryParams + `id=${id}&`);
          });

          let finalURL = baseURL + queryParams;
          let gameNames = await api.get(finalURL);
          let gameNameArray = gameNames.data.data;

          let finalArray = dataArray.map((stream) => {
              stream.gameName = "";
              gameNameArray.map((name) => {
                if (stream.game_id === name.id) {
                  return (stream.gameName = name.name);
                }
              });
              let newURL = stream.thumbnail_url
              .replace("{width}", "420")
              .replace("{height}", "240");
              stream.thumbnail_url = newURL;
              return stream;
          });
          setChannels(finalArray);
        };
        fetchData();
    }, []);


  return (
    <div>
        <div className='mt-4'>
        <h1>Live streams</h1>
        <button className='btn btn-success'>Promote My channel</button>
        </div>
        
        <div className='row'>
            {channels.map((channel) => (
                <div className='col-lg-4 col-md-6 col-sm-8 mt-4'>
                    <div className='card'>
                        <img className='card-img-top' src={channel.thumbnail_url}></img>
                        <div className='card-body'>
                            <h4 className='"card-title'>{channel.user_name}</h4>
                            <h5 className='card-text'>{channel.gameName}</h5>
                            <div className='card-text'>
                                {channel.viewer_count} live viewers
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}

export default Streams;