const findIndexOfVehicle = (vehicles, selectedvehicle) => {
  const indexOfVehicle = vehicles.findIndex((vehicle) => {
    if (vehicle.name === selectedvehicle) {
      return true;
    }
    return false;
  });
  return indexOfVehicle;
};

const findIndexOfPlanet = (planets, selectedPlanets, index) => {
  const indexOfPlanet = planets.findIndex((planet) => {
    if (planet.name === selectedPlanets[index]) {
      return true;
    }
    return false;
  });
  return indexOfPlanet;
};

export { findIndexOfVehicle, findIndexOfPlanet };
