const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // console.log(JSON.parse(body));
    callback(error, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, rbody) => {
    const body = JSON.parse(rbody);
    // console.log(body.status);
    // console.log(rbody);
    if (error) {
      // console.log(`error: error ${error}`);
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      // console.log(`error: response ${response}`);
      const msg = `Status Code ${response.statusCode} when fetching IP. 
                  Response: ${JSON.stringify(body)}`;
      callback(Error(msg), null);
      return;
    }
    if (body.status === "error") {
      // console.log(`error: status ${body.status}`);
      callback(body.status, null);
    }
    // console.log(`good: ${body}`);
    const coordinates = {};
    coordinates.latitude = body.data.latitude;
    coordinates.longitude = body.data.longitude;
    callback(error, coordinates);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const latitude = coords.latitude;
  const longitude = coords.longitude;
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`,
    (error, response, rbody) => {
      const body = JSON.parse(rbody);
      // console.log(rbody);
      if (error) {
        callback(error, null);
        return;
      }
      // if non-200 status, assume server error
      if (response.statusCode !== 200) {
        // console.log(`error: response ${response}`);
        const msg = `Status Code ${
          response.statusCode
        } when fetching ISS Data. Response: ${JSON.stringify(body)}`;
        callback(Error(msg), null);
        return;
      }
      callback(error, body.response);
    }
  );
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    let ip = data;
    fetchCoordsByIP(ip, (error, obj) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(obj, (error, arr) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(error, arr);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
