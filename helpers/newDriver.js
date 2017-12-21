const faker = require('faker');

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
};
