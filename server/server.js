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

const port = process.env.PORT || 4000;

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
        resolve(secretsJSON);
      }
    });
  });
};

const proxy = (req, res) => {
  axios({
    url: `${URL}${req.originalUrl}`,
    method: req.method.toLowerCase(),
    headers: {
      Authorization: TOKEN,
    },
    data: req.body,
  }).then((response) => {
    res.json(response.data);
  }).catch((err) => {
    res.end();
  });
};

app.route(/(products|reviews|qa|cart|interactions).*/)
  .get(proxy)
  .post(proxy)
  .put(proxy);

// app.listen(4000, async () => {
app.listen(port, async () => {
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
