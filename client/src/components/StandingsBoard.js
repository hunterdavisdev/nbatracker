import React, { useState, useEffect } from 'react';

const Standings = () => {
  const [apiData, setBody] = useState({ standings: [] });

  const standingsStyle = {
    background: 'white',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    borderRadius: '10px',
    padding: '6%',
    paddingTop: '2%'
  };

  const tableStyle = {
    width: '100%',
    margin: 'auto',
    textAlign: 'left'
  };

  const imageStyle = {
    float: 'left',
    width: '48px',
    height: '48px',
    paddingRight: '10px'
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/nba/standings');
      const body = await result.json();
      if (body) {
        setBody(body);
      }
    };
    fetchData();
  }, []);

  return (
    apiData && (
      <div style={standingsStyle}>
        <h1
          style={{
            paddingBottom: '20px',
            fontWeight: '300'
          }}
        >
          Standings
        </h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Team</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Win Ratio</th>
            </tr>
          </thead>
          <tbody>
            {apiData.standings.map(team => {
              return (
                <tr>
                  <td>
                    <div style={{ display: 'inline' }}>
                      <img src={team.icon} style={imageStyle} alt='' />
                      <p>{team.name}</p>
                    </div>
                  </td>
                  <td> {team.wins} </td>
                  <td> {team.losses} </td>
                  <td> {((team.wins + 1) / (team.losses + 1)).toFixed(2)} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
};

export default Standings;
