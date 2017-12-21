const geodist = require('geodist');

const getWaitEstimate = (driver, riderLoc) => {
  const filterDriver = driver.driver_loc.split(/[POINT()]/g)[6].split(' ');
  const filterRider = riderLoc.split(/[POINT()]/g)[6].split(' ');

  const driverLocation = { lat: Number(filterDriver[1]), lon: Number(filterDriver[0]) };
  const riderLocation = { lat: Number(filterRider[1]), lon: Number(filterRider[0]) };
  const miles = geodist(driverLocation, riderLocation, { exact: true, unit: 'miles' });

  return Math.floor(miles * 0.62 / 20 * 60);
};

module.exports.getWaitEstimate = getWaitEstimate;

//    { driver_id: 44008, driver_loc: 'POINT(-121.751097 37.797943)' }
// const test = {
//   drivers: [
//     { driver_id: 44008, driver_loc: 'POINT(-121.751097 37.797943)' },
//     { driver_id: 23802, driver_loc: 'POINT(-121.753128 37.799053)' },
//     {
//       driver_id: 474476,
//       driver_loc: 'POINT(-121.753565 37.798707)',
//     },
//     {
//       driver_id: 457468,
//       driver_loc: 'POINT(-121.754037 37.798008)',
//     },
//     { driver_id: 339543, driver_loc: 'POINT(-121.75307 37.796663)' },
//   ],
//   ride_id: 'f3213639-bcf6-4861-8fc0-726318249d97',
//   start_loc: 'POINT(-122.575632 37.052107)',
// };
//       driver_loc: 'POINT(-121.754037 37.798008)',
//     },
//     { driver_id: 339543, driver_loc: 'POINT(-121.75307 37.796663)' },
//   ],
//   ride_id: 'f3213639-bcf6-4861-8fc0-726318249d97',
//   start_loc: 'POINT(-122.575632 37.052107)',
// };
