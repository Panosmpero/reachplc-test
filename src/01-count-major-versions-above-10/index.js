/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */
const axios = require('axios');
const ENDPOINT = 'http://ambush-api.inyourarea.co.uk/ambush/intercept';
const postBody = {
  url: 'https://api.npms.io/v2/search/suggestions?q=react',
  method: 'GET',
  return_payload: true,
};

module.exports = async function countMajorVersionsAbove10() {
  try {
    const { data } = await axios.post(ENDPOINT, postBody);
    const { content } = data;

    const result = content.filter(entry => {
      const majorVersion = entry.package.version.split('.')[0];
      return Number(majorVersion) > 10;
    });

    const count = result.length;

    return count;
  } catch (error) {
    console.log(error);
  }
};
