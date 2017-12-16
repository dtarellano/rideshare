const express = require('express');
const cassandra = require('cassandra-driver');
const async = require('async');
const generateData = require('./fakeData.js').generateData;
const db = require('../database/cassandradb.js').db;

const app = express();

app.use(express.static(`${__dirname}/../fake`));

app.get('/data', (request, response) => {
  generateData(db);
  console.log('submitted a data posting');
});

app.get('/', (request, response) => {
  response.status(200).end('bruh');
});

console.log('listening on port 1337...\n');
app.listen(1337);
