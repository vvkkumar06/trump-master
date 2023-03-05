import _ from 'lodash';
import allCricketPlayers from '../../data/cricket-players';

export const initialTeamCardsState = {
  player1: 123,
  player2: undefined,
  player3: undefined,
  player4: undefined,
  player5: 154
}

export const teamReducer = (state, action) => {
  switch (action.type) {
    case "REMOVE":
      const newState = {...state};
      newState[`player${action.playerId}`] = undefined;
      return newState;
    default:
      return state;
  }
};

export const transformTeamCardsStateToList = (data) => {
  const team = {};
  for(let key in data) {
    team[key] = allCricketPlayers.find(item => item.TMID == data[key]);
  }
  return team;
}

export const findVacantPlayer = (data) => {
  return Object.keys(data).find(key => !data[key]);
}