const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../public/')));

const AWS = require('aws-sdk');

let URL;
let TOKEN;
const getAwsSecret = function () {
  const region = 'us-east-2';
  const client = new AWS.SecretsManager({ region });
  const SecretId = 'neptune-secret';
  return new Promise((resolve, reject) => {
    // retrieving secrets from secrets manager
    client.getSecretValue({ SecretId }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        // parsing the fetched data into JSON
        const secretsJSON = JSON.parse(data.SecretString);

        // creating a string to store write to .env file
        // .env file shall look like this :
        // SECRET_1 = sample_secret_1
        // SECRET_2 = sample_secret_2
        const secretsString = '';
        // Object.keys(secretsJSON).forEach((key) => {
        //   secretsString += `${key}=${secretsJSON[key]}\n`;
        // });
        resolve(secretsJSON);
      }
    });
  });
};

// eslint-disable-next-line prefer-destructuring
// const URL = process.env.URL;
// eslint-disable-next-line prefer-destructuring
// const TOKEN = process.env.TOKEN;
// const TEST = 5;
// if (!(URL && TOKEN)) {
//   getAwsSecret().then((secretsJSON) => {
//     URL = secretsJSON.URL;
//     TOKEN = secretsJSON.TOKEN;
//   });
// }

const proxy = (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  // eslint-disable-next-line prefer-destructuring

  axios({
    url: `${URL}${req.originalUrl}`,
    method: req.method.toLowerCase(),
    headers: {
      // ...req.headers,
      Authorization: TOKEN,
    },
    data: req.body,
  }).then((response) => {
    res.json(response.data);
  }).catch((err) => {
    console.log('######', err);
    res.end('Error');
  });
};

app.route(/(products|reviews|qa|cart|interactions).*/)
  .get(proxy)
  .post(proxy);

app.listen(3000, async () => {
  await dotenv.config();
  // eslint-disable-next-line prefer-destructuring
  URL = process.env.URL;
  TOKEN = process.env.TOKEN;

  if (!(URL && TOKEN)) {
    const secretsJSON = await getAwsSecret();
    URL = secretsJSON.URL;
    TOKEN = secretsJSON.TOKEN;
  }

  URL = URL.replace(/\/$/, '');
});
