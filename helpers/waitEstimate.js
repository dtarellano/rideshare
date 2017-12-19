const getWaitEstimate = (lat1, lon1, lat2, lon2) => {
  const kmToMi = 0.62;
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.floor(d * kmToMi / 20 * 60);
};

const deg2rad = deg => deg * (Math.PI / 180);

// console.log(getWaitEstimate(37.22, -122.2, 37.46, -122.3));
// 52 min...

module.exports.getWaitEstimate = getWaitEstimate;
