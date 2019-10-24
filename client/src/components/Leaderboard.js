import React from 'react';

const Leaderboard = ({ players }) => {
  const tableStyle = {
    width: '100%',
    margin: 'auto',
    textAlign: 'left'
  };

  const imageStyle = {
    float: 'left',
    width: '36px',
    height: '36px'
  };

  return (
    <div>
      <h1
        style={{
          paddingBottom: '20px',
          fontWeight: '300'
        }}
      >
        Leaderboard
      </h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Score</th>
            <th>Name</th>
            <th>Teams</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => {
            return (
              <tr>
                <td> {player.score} </td>
                <td> {player.name} </td>
                <td>
                  {player.icons.map(icon => {
                    return <img src={icon} style={imageStyle} alt='' />;
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
