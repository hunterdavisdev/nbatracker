import React, { useState, useEffect } from 'react';
import StandingsBoard from '../components/StandingsBoard';
import Leaderboard from '../components/Leaderboard';
import messages from '../static/motd';

const LeagueContainer = () => {
  const [motd, setMotd] = useState(messages[Math.floor(Math.random() * messages.length)]);
  const [loser, setLoser] = useState('');
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/nba/leaderboard');
      const body = await result.json();
      if (body) {
        setLoser(body[body.length - 1].name);
        setPlayers(body);
      }
    };
    fetchData();
  }, []);

  const wrapperStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gridGap: '5em',
    padding: '3% 10% 3% 10%'
  };
  return (
    <div className='leagueWrapper'>
      <h1
        style={{
          textAlign: 'center',
          margin: '0',
          paddingTop: '40px'
        }}
      >
        <span
          style={{
            color: 'rgb(255, 60, 60)'
          }}
        >
          {loser}
        </span>{' '}
        {motd}
      </h1>
      <div className='statsWrapper' style={wrapperStyle}>
        <StandingsBoard />
        <Leaderboard players={players} />
      </div>
    </div>
  );
};

export default LeagueContainer;
