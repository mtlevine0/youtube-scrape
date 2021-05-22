const scraper = require("./scraper");

exports.handler = async event => {
  const query = event.queryStringParameters.query;
  const page = event.queryStringParameters.page;
  const promise = new Promise((resolve, reject) => {
    scraper
      .youtube(query, null, null)
      .then(x => {
        const response = {
          statusCode: 200,
          body: JSON.stringify(x),
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        };
        return resolve(response);
      })
      .catch(e => {
        const response = {
          statusCode: 500,
          body: JSON.stringify(e),
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        };
        return reject(response);
      });
  });
  return promise;
};
