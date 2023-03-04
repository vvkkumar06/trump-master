const axios = require('axios');

let getStatsUrl = (id) =>
  `https://scores.iplt20.com/ipl/feeds/stats/player/${id}-playerstats.js`;
const playerStats = {};
const statsUrls = [];
const setupStatsUrls = () => {
  for (let i = 0; i <= 10000; i++) {
    statsUrls.push(getStatsUrl(i));
  }
};
setupStatsUrls();

const getUrlPromies = () => {
  return statsUrls.map((url) => {
    return fetch(url).then((res) => res.text());
  });
};

const fetchStats = () => {
  Promise.all(getUrlPromies()).then((result) => {
    result.map((res) => {
      try {
        if (res.startsWith("onPlayerStats(")) {
          fetch(
            `https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/ipl/284/stats.ClientPlayerID.png`
          )
            .then((response) => response.blob())
            .then((blob) => {
              var reader = new FileReader();
              reader.onload = function () {
                console.log(this.result);
                let sIndex = res.indexOf("onPlayerStats(");
                let eIndex = res.indexOf(");");
                let rStr = res.substring(sIndex + 14, eIndex);
                let data = JSON.parse(rStr);
                let bat = data["Batting"][0];
                let bowl = data["Bowling"][0];
                let stats = { ...bowl, ...bat };
                playerStats[stats.ClientPlayerID] = stats;
              }; // <--- `this.result` contains a base64 data URI
              reader.readAsDataURL(blob);
            });
        } else {
          console.log("Id not exists");
        }
      } catch (err) {
        console.log("Id not exists");
      }
    });
    // console.log(playerStats);
  });
};
// fetchStats();

urlContentToDataUri(
  `https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/ipl/284/14.png`
).then((res) => console.log(res));

function urlContentToDataUri(url) {
  return axios(url, { responseType: 'blob', method: 'get'} )
    .then(
      (blob) =>
        new Promise((callback) => {
          let reader = new FileReader();
          reader.onload = function () {
            callback(this.result);
          };
          reader.readAsDataURL(blob);
        })
    );
}

// () => {
//   fetch(getStatsUrl(i))
//     .then((res) => res.text())
//     .then((res) => {
//       let sIndex = res.indexOf("onPlayerStats(");
//       let eIndex = res.indexOf(");");
//       let rStr = res.substring(sIndex + 14, eIndex);
//       let data = JSON.parse(rStr);
//       let bat = data["Batting"][0];
//       let bowl = data["Bowling"][0];
//       let stats = { ...bowl, ...bat };
//       playerStats[stats.ClientPlayerID] = stats;
//       // console.log(stats);
//     })
//     .catch((error) => {
//       console.log("Id does not exit:", i);
//     });
// };
