import _ from 'lodash';
import allCricketPlayers from '../../../data/cricket-players';
export const transformGalleryCardStateToList = (data) => {
  let tempData = _.cloneDeep(data);
  let galleryItems = [];
  Object.keys(tempData).forEach(key => {
    for(let i=0; i<tempData[key].count; i++) {
      galleryItems.push(allCricketPlayers.find(item => item.TMID == key));
    }
  });
  return galleryItems;
}


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