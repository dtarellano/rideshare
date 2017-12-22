const sqs = require('./sqs_createQueue.js').sqs;

const sendDeclinedDrivers = (drivers, driver) => {
  const declinedDrivers = [];
  for (let i = 0; i < drivers.length; i++) {
    if (drivers[i] !== driver) {
      declinedDrivers.push(drivers[i]);
    }
  }
  sqs.sendMessage({ declinedDrivers }, (err, data) => {
    if (err) {
      console.log('Error', err);
    }
  });
};

module.exports.sendDeclinedDrivers = sendDeclinedDrivers;
