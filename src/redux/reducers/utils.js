export const findVacantPlayer = (data) => {
  if (!data['card1']) {
    return 'card1'
  }
  if (!data['card2']) {
    return 'card2'
  }
  if (!data['card3']) {
    return 'card3'
  }
  if (!data['card4']) {
    return 'card4'
  }
  if (!data['card5']) {
    return 'card5'
  }
  return undefined;
}

export const transformCollectionToList = (data, stats) => {
  const list = [];
  data && stats && 
    Object.keys(data).forEach(key => {
      for (let i = 0; i < data[key].count; i++) {
        list.push(stats.find(item => item.TMID == key));
      }
    });
  return list;
}

export const transformTeamToPlayingCards = (data, stats) => {
  const team = {};
  if(data && stats) {
    for(let key in data) {
      team[key] = stats.find(item => item.TMID == data[key]);
    }
  }
  return team;
}