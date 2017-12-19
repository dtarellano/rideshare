const axios = require('axios');

const driverSelector = (drivers) => {
  const random = Math.floor(Math.random() * 5);
  console.log('Index: ', random);
  return drivers[random];
};

const toSQS = () => {};
