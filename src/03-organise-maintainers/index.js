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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */
const axios = require('axios');
const ENDPOINT = 'http://ambush-api.inyourarea.co.uk/ambush/intercept';
const postBody = {
  url: 'https://api.npms.io/v2/search/suggestions?q=react',
  method: 'GET',
  return_payload: true,
};

module.exports = async function organiseMaintainers() {
  try {
    const { data } = await axios.post(ENDPOINT, postBody);
    const { content } = data;

    /*
    create a set with unique usernames as keys
    and arrays as values with package names
    {
      username: ["package1", "package2"],
      username2: ["package1", "package2"],
    }
    */
    let result = {};
    content.forEach(entry => {
      const packageName = entry.package.name;

      entry.package.maintainers.forEach(maintainer => {
        const { username } = maintainer;

        // if there is no key(username), add it and set its value as an array with package name
        // otherwise just add the package name to the existing array
        result[username] = result[username]
          ? [...result[username], packageName]
          : [packageName];
      });
    });

    const maintainersSorted = Object.keys(result).sort();
    const maintainers = maintainersSorted.map(username => {
      const packageNames = result[username].sort();
      return {
        username,
        packageNames,
      };
    });

    return maintainers;
  } catch (error) {
    console.log(error);
  }
};
