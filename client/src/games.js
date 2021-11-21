import React, { useState, useEffect } from 'react';
import './index.css';
import api from './api'

function Games() {

  const [games, setGames] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get('https://api.twitch.tv/helix/games/top');
      let dataArray = result.data.data;
      let finalArray = dataArray.map(game => {

        let newURL = game.box_art_url
          .replace("{width}", "300")
          .replace("{width}", "300");

        game.box_art_url = newURL;

        return game;
      });
      setGames(finalArray);
    };
    fetchData();
  }, []);


  return (
    <div>
      <h1>Most Popular Games</h1>
      <div className="row">
        {games.map((game) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <div className="card">
              <img className="card-img-top" src={game.box_art_url} />
              <div className="card-body">
                <h5 className="card-title">{game.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;