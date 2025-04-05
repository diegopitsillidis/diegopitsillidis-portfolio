/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const https = require('https');

exports.handler = async (event) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      //set in console
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods': 'POST, OPTIONS',
      //   'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      // },
      body: '',
    };
  }

  const body = JSON.parse(event.body);

  const options = {
    hostname: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: data,
          //set in console
          // headers: {
          //   'Access-Control-Allow-Origin': '*',
          //   'Access-Control-Allow-Methods': 'POST, OPTIONS',
          //   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          // },
        });
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify(body));
    req.end();
  });
};
