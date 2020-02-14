// iss_promised.js
const request = require("request-promise-native");

const fetchMyIP = function() {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function(rIp) {
  // console.log(rIp);
  const ip = JSON.parse(rIp);
  // console.log(ip.ip);
  return request(`https://ipvigilante.com/${ip.ip}`);
};

const fetchISSFlyOverTimes = function(rObj) {
  // console.log(rObj);
  // const { latitude, longitude } = JSON.parse(body).data;
  const data = JSON.parse(rObj);
  const latitude = data.data.latitude;
  const longitude = data.data.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(rObj => {
      const body = JSON.parse(rObj).response;
      callback(body);
    })
    .catch(error => {
      console.log("error!", error);
    });
};

module.exports = { nextISSTimesForMyLocation };
