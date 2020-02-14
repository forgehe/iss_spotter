const { nextISSTimesForMyLocation } = require("./iss_promised");

// fetchMyIP().then(data => {
//   fetchCoordsByIP(data).then(data => {
//     console.log(data);
//   });
// });

// let test = `{ "ip": "162.245.144.188" }`;
// fetchCoordsByIP(test).then(data => {
//   console.log(data);
// });

// fetchMyIP().then(body => console.log(body));

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(JSON.parse(body).response));

// let test = `{"status": "success","data": {"ipv4": "45.55.8.152","continent_name": "North America","country_name": "United States","subdivision_1_name": "California","subdivision_2_name": null,"city_name": "San Francisco","latitude": "37.73530","longitude": "-122.37320"}}`;

// fetchISSFlyOverTimes(test).then(data => {
//   console.log(JSON.parse(data).response);
// });
nextISSTimesForMyLocation(data => {
  printISSInfo(data);
});

const printISSInfo = function(passTimes) {
  let currentDate = new Date();
  console.log(`Current Time is: ${currentDate}`);
  for (const obj of passTimes) {
    let date = new Date(parseInt(obj.risetime) * 1000);
    // console.log(date.toString());
    console.log(`Next pass at ${date} for ${obj.duration} seconds!`);
  }
};
