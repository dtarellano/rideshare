const express = require('express');
const BodyParser = require('body-parser');
const cassandra = require('cassandra-driver');
const cluster = require('cluster');

const generateData = require('./fakeData.js').generateData;
const db = require('../database/cassandradb.js').db;
const getWaitEstimate = require('../helpers/waitEstimate.js').getWaitEstimate;

if (cluster.isMaster) {
  const cpuCount = require('os').cpus().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  const app = express();

  app.use(express.static(`${__dirname}/../fake`));
  app.use(BodyParser.json());

  app.get('/data', (request, response) => {
    generateData(db);
    console.log('submitted a data posting');
  });

  app.post('/dispatch', (request, response) => {
    console.log(request.body);

    response.status(200).end();
  });
  app.get('/', (request, response) => {
    response.status(200).end('bruh');
  });

  console.log('listening on port 1337...\n', cluster.worker.id);
  app.listen(1337);
}
