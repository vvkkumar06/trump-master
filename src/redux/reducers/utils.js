import AsyncStorage from '@react-native-async-storage/async-storage';

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
  return  !(data && stats) ? undefined : list
}

export const transformTeamToPlayingCards = (data, stats) => {
  const team = {};
  if (data && stats) {
    for (let key in data) {
      team[key] = stats.find(item => item.TMID == data[key]);
    }
  }
  return team;
}

export const getCardDetailsFromTmId = (id, stats) => {
  return stats.find(item => item.TMID == id);
}

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.log('Problem saving data to store')
  }
}

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value;
  } catch(e) {
    console.log("Error reading data from store")
  }
}