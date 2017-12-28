const faker = require('faker');
// const sqs = require('./sqs_createQueue.js').sqs;

const createLocation = () => {
  const minLog = -122.75;
  const minLat = 36.8;
  const log = (minLog + Math.random()).toPrecision(6);
  const lat = (minLat + Math.random()).toPrecision(6);
  return `POINT(${log} ${lat})`;
};

const newDriver = () => {
  const driver = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    joined: new Date(),
    location: createLocation(),
  };
  sqs.sendMessage({ driver }, (err, data) => {
    if (err) {
      console.log('Error: ', err);
    }
  });
};

module.exports.newDriver = newDriver;
