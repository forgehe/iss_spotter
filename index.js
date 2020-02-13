// index.js
const { fetchMyIP, fetchCoordsByIP } = require("./iss");

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
const ip = "45.55.8.152";

fetchCoordsByIP(ip, (error, coordinates) => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    console.log(`${JSON.stringify(coordinates)}`);
  }
});
