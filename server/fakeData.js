const faker = require('faker');

const createLocation = () => {
  const minLog = -122.75;
  const minLat = 36.8;
  const log = (minLog + Math.random()).toPrecision(4);
  const lat = (minLat + Math.random()).toPrecision(4);
  return `POINT(${log} ${lat})`;
};

const generateData = (db, count) => {
  if (count === 50001) {
    return;
  }
  const query =
		'INSERT INTO analytics (id, ride_id, driver_id, driver_loc, rider_loc, wait_est) VALUES (uuid(), ?, ?, ?, ?, ?);';
  let counter = count || 0;
  const recurse = () => {
    const params = [];
    for (let i = 0; i <= 100; i++) {
      const ride_id = faker.random.number();
      const driver_id = faker.random.number();
      const driver_loc = createLocation();
      const rider_loc = createLocation();
      const wait_est = Math.floor(Math.random() * 10) + 1;
      params.push({
        query,
        params: [ride_id, driver_id, driver_loc, rider_loc, wait_est],
      });
    }
    return params;
  };
  db.batch(recurse(), { prepare: true }).then((resolved, err) => {
    if (err) {
      console.log(err);
    } else {
      counter++;
      generateData(db, counter);
    }
  });
  console.log('Row count: ', `${count}00`);
};

module.exports.generateData = generateData;
