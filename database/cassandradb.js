const cassandra = require('cassandra-driver');

const db = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'dispatch' });

db.connect((err) => {
  if (err) {
    console.log('FAILED TO CONNECT', err);
  }
});

const query =
	'CREATE TABLE IF NOT EXISTS log (id UUID PRIMARY KEY, ride_id int, driver_id int, rider_loc text, driver_loc text);';

const logQuery =
	'CREATE TABLE IF NOT EXISTS analytics (id UUID PRIMARY KEY, ride_id int, driver_id int, rider_loc text, driver_loc text, wait_est int)';
db.execute(query, (err, results) => {
  if (err) {
    console.log('Failed to insert table', err);
  }
});

db.execute(logQuery, (err, results) => {
  if (err) {
    console.log('Failed to insert analytics table', err);
  }
});

module.exports.db = db;
