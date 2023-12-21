function getDirectionAndAngle(coord1, coord2) {
  // Calculate the differences in latitude and longitude
  const latDiff = coord2.latitude - coord1.latitude;
  const lonDiff = coord2.longitude - coord1.longitude;

  // Calculate the angle from the north (0 to 360 degrees)
  let angle = Math.atan2(lonDiff, latDiff) * (180 / Math.PI);
  angle = (angle + 360) % 360; // Ensure the angle is positive and within the range [0, 360)

  // Calculate the direction (N, NE, E, SE, S, SW, W, NW)
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const directionIndex = Math.round(angle / 45) % 8;
  const direction = directions[directionIndex];
  console.log(angle);

  return { direction, angle };
}

export default getDirectionAndAngle;
