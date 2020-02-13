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

module.exports = { fetchMyIP, fetchCoordsByIP };
