const express = require('express');
const BodyParser = require('body-parser');
const cassandra = require('cassandra-driver');
const cluster = require('cluster');
const axios = require('axios');

const generateData = require('./fakeData.js').generateData;
const db = require('../database/cassandradb.js').db;
const getWaitEstimate = require('../helpers/getWaitEstimate.js').getWaitEstimate;
const driverSelector = require('../helpers/driverSelector.js').driverSelector;
const analytics = require('../helpers/log.js').analytics;
const sqs = require('../aws/sqs_createQueue.js').sqs;

let queue = [];

if (cluster.isMaster) {
  const cpuCount = require('os').cpus().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  const app = express();

  app.use(express.static(`${__dirname}/../fake`));
  app.use(BodyParser.json());
  // GENERATE FAKE DATA
  app.get('/data', (request, response) => {
    generateData(db);
    console.log('submitted a data posting');
  });
  // FROM INVENTORY
  app.post('/dispatch', (request, response) => {
    const limit = queue.length;
    const driver = driverSelector(request.body.drivers);
    const waitTime = getWaitEstimate(driver, request.body.rider_loc);

    if (limit >= 100) {
      db.batch(queue, { prepare: true }).catch(error => console.log(error, queue));
      queue = [];
    }

    setInterval(() => {
      if (queue.length) {
        db.batch(queue, { prepare: true }).catch(error => console.log('ERROR: ', error, queue));
      }
      queue = [];
    }, 5000);

    queue.push(analytics(request.body.ride_id, driver, request.body.rider_loc, waitTime));
    // axios.post('toRiderclient', {
    //   query: {
    //     ride_id: request.body.ride_id,
    //     driver_loc: request.body.driver_loc,
    //     wait_time: waitTime,
    //   },
    // });

    response.status(200).end();
  });
  app.get('/', (request, response) => {
    response.status(200).end('bruh');
  });

  console.log('listening on port 1337...\n', cluster.worker.id);
  app.listen(1337);
}
