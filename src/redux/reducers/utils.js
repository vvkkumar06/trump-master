export const findVacantPlayer = (data) => {
  if(!data['card1']){
    return 'card1'
  }
  if(!data['card2']){
    return 'card2'
  }
  if(!data['card3']){
    return 'card3'
  }
  if(!data['card4']){
    return 'card4'
  }
  if(!data['card5']){
    return 'card5'
  }
  return undefined;
}
