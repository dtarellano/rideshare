const express = require('express');
const cassandra = require('cassandra-driver');
const async = require('async');
const generateData = require('./fakeData.js').generateData;

const db = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'dispatch' });

db.connect((err) => {
  if (err) {
    console.log('FAILED TO CONNECT', err);
  } else {
    console.log('CREATED A CASSANDRA DB CONNECTION');
  }
});

const query =
	'CREATE TABLE IF NOT EXISTS log (id UUID PRIMARY KEY, ride_id int, driver_id int, rider_loc text, driver_loc text);';

db.execute(query, (err, results) => {
  if (err) {
    console.log('Failed to insert table', err);
  } else {
    console.log('Success here are the results:', results);
  }
});

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
