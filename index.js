// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// const ip = fetchMyIP((error, ip) => {
//   console.log(`${typeof ip}, ${ip}`);
//   // return ip;
// });
// console.log(ip);
// const ip = "fuck";
// const ip = "45.55.8.152";
// let cords = { latitude: "49.27670", longitude: "-123.13000" };

// fetchCoordsByIP(ip, (error, coordinates) => {
//   if (error) {
//     console.log(`Error: ${error}`);
//   } else {
//     console.log(`${JSON.stringify(coordinates)}`);
//   }
// });

// fetchISSFlyOverTimes(cords, (error, obj) => {
//   if (error) {
//     console.log(`Error: ${error}`);
//   } else {
//     console.log(obj);
//   }
// });

const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});
