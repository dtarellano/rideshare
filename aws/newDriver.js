const faker = require('faker');
const sqs = require('./sqs_createQueue.js').sqs;

const createLocation = () => {
  const minLog = -122.75;
  const minLat = 36.8;
  const log = (minLog + Math.random()).toPrecision(4);
  const lat = (minLat + Math.random()).toPrecision(4);
  return `POINT(${log} ${lat})`;
};

const newDriver = () => {
  const driver = {
    name: faker.name.findName(),
    joined: new Date(),
    available: true,
    last_checkin: newDate(),
    location: createLocation(),
  };
  sqs.sendMessage({ driver }, (err, data) => {
    if (err) {
      console.log('Error: ', err);
    }
  });
};

module.exports.newDriver = newDriver;
