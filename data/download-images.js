
const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')
const cricPlayers = require('./cricket-players');
const dataWithImage = {};
async function downloadImage(url, name) {
  const path = Path.resolve(__dirname, '../assets/cricket/images/players', `${name}.png`)
  try {
    const response = await Axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
    const writer = Fs.createWriteStream(path)

    response.data.pipe(writer)
    dataWithImage[name] = cricPlayers[name];
  
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  } catch (err) {
    // console.log(err);
  }
}

const ids = Object.keys(cricPlayers);
ids.map(id => {
  const url = `https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/ipl/284/${id}.png`;
  // console.log(url, id);
 downloadImage(url, id)
})


