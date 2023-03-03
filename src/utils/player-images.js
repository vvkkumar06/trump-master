import playerBio from './../../data/player-bio';
const playerProfileImages = {};

export const setupProfileImages = () => {
  playerBio.data && playerBio.data.map(player => {
    playerProfileImages[player.fullname] = player.image_path;
  });
};

export const getPlayerProfileImage = (playerName) => playerProfileImages[playerName];