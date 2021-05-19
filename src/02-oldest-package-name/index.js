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

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */
const axios = require('axios');
const ENDPOINT = 'http://ambush-api.inyourarea.co.uk/ambush/intercept';
const postBody = {
  url: 'https://api.npms.io/v2/search/suggestions?q=react',
  method: 'GET',
  return_payload: true,
};

module.exports = async function oldestPackageName() {
  try {
    const { data } = await axios.post(ENDPOINT, postBody);
    const { content } = data;

    const sortedDateAsc = content.sort((a, b) =>
      a.package.date > b.package.date ? 1 : -1,
    );

    // since array is date sorted in ascending order
    // pick the first item and get the name of the package
    const { name } = sortedDateAsc[0].package;
    return name;
  } catch (error) {
    console.log(error);
  }
};
