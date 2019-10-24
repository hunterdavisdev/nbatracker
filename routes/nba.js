const router = require('express').Router();
const axios = require('axios');
const players = require('../players').players;
const teamsUri = 'https://data.nba.net/prod/v2/2019/teams.json';
const standingsUri =
  'https://stats.nba.com/stats/leaguestandingsv3?LeagueID=00&Season=2019-20&SeasonType=Regular+Season';

const getStandings = async () => {
  const standings = await axios.get(standingsUri);
  if (!standings) {
    return { errors: [{ msg: `Failed to fetch resource at ${standingsUri}` }] };
  } else {
    const json = { standings: [] };
    const teams = await getTeams();
    standings.data.resultSets[0].rowSet.map(team => {
      const id = parseInt(team[2]);
      const icon = getIconUrlById(id, teams);
      const pushStanding = {
        id: team[2],
        icon: icon,
        name: team[4],
        wins: team[12],
        losses: team[13]
      };
      json.standings.push(pushStanding);
    });
    return json;
  }
};

const getTeams = async () => {
  const teams = await axios.get(teamsUri);
  if (!teams) {
    return { errors: [{ msg: `Failed to fetch resource at ${teamsUri}` }] };
  } else {
    const json = { teams: [] };
    teams.data.league.standard.map(team => {
      const pushTeam = {
        id: team.teamId,
        name: team.fullName,
        tricode: team.tricode
      };
      json.teams.push(pushTeam);
    });
    return json;
  }
};

const getWinsById = (id, data) => {
  let wins = 0;
  data.standings.forEach(teamStanding => {
    if (teamStanding.id == id) {
      wins = teamStanding.wins;
    }
  });
  return wins;
};

function getIconUrlById(id, data) {
  let iconUrl = '';
  data.teams.forEach(team => {
    if (id == team.id) {
      iconUrl = `https://www.nba.com/assets/logos/teams/primary/web/${team.tricode}.svg`;
    }
  });
  return iconUrl;
}

router.get('/leaderboard', async (req, res) => {
  /**
   * Used for grabbing the wins of the team
   */
  const standings = await getStandings();
  if (!standings.errors) {
    /**
     * Used for grabbing the icon url of the team
     */
    const teams = await getTeams();
    if (!teams.errors) {
      const returnData = { players: [] };
      players.forEach(player => {
        let score = 0;
        let icons = [];
        for (var t = 0; t < player.teams.length; t++) {
          const id = parseInt(player.teams[t]);
          icons.push(getIconUrlById(id, teams));
          score += getWinsById(id, standings);
        }
        const pushPlayer = {
          name: player.name,
          icons: icons,
          score: score
        };
        returnData.players.push(pushPlayer);
      });
      res.json(
        returnData.players.sort((a, b) => {
          return parseInt(b.score) - parseInt(a.score);
        })
      );
    }
  }
});

router.get('/standings', async (req, res) => {
  const standings = await getStandings();
  if (!standings.errors) {
    res.json(standings);
  } else {
    res.json({
      errors: standings.errors
    });
  }
});

module.exports = router;
