export const findVacantPlayer = (data) => {
  return Object.keys(data).find(key =>!data[key].TMID);
}