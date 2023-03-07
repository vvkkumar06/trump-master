import _ from 'lodash';
export const transformGalleryCardStateToList = (data, playersApiData) => {
  let tempData = _.cloneDeep(data);
  let galleryItems = [];
  Object.keys(tempData).forEach(key => {
    for(let i=0; i<tempData[key].count; i++) {
      galleryItems.push(playersApiData.find(item => item.TMID == key));
    }
  });
  return galleryItems;
}


export const transformTeamCardsStateToList = (data, playersApiData) => {
  const team = {};
  for(let key in data) {
    team[key] = playersApiData.find(item => item.TMID == data[key]);
  }
  return team;
}

export const findVacantPlayer = (data) => {
  return Object.keys(data).find(key => !data[key]);
}