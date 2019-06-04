/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss';


const isDisabled = (selectedPlanets, planetNumber, vehicle, planets, usedVehicles) => {
  const selectedPlanet = selectedPlanets[Number(planetNumber) - 1];
  const indexOfPlanet = planets.findIndex((planet) => {
    if (planet.name === selectedPlanet) {
      return true;
    }
    return false;
  });
  const planetDetails = planets[indexOfPlanet];
  const { distance } = planetDetails;
  const planetNotReachable = (vehicle.max_distance < distance);
  const isVehicleAvailable = vehicle.total_no
  - ((usedVehicles[vehicle.name]) ? (usedVehicles[vehicle.name]) : 0);
  const shouldBeDisabled = planetNotReachable || !isVehicleAvailable;
  return shouldBeDisabled;
};

const RadioButton = ({
  vehicles, onRadioClick, planetNumber, selectedPlanets, planets, usedVehicles,
}) => (
  <div>
    {
          vehicles.map(vehicle => (
            <div key={vehicle.name} className="dropdown">
              <input
                type="radio"
                name={`vehicle${planetNumber}`}
                value={vehicle.name}
                disabled={isDisabled(selectedPlanets, planetNumber, vehicle, planets, usedVehicles)}
                onClick={onRadioClick}
              />
              {' '}
              {vehicle.name}
              {` (${vehicle.total_no - ((usedVehicles[vehicle.name]) ? (usedVehicles[vehicle.name]) : 0)})`}
              <br />
            </div>
          ))
      }
  </div>
);

RadioButton.propTypes = {
  vehicles: PropTypes.array.isRequired,
  selectedPlanets: PropTypes.array.isRequired,
  planets: PropTypes.array.isRequired,
  onRadioClick: PropTypes.func.isRequired,
  planetNumber: PropTypes.number.isRequired,
  usedVehicles: PropTypes.object.isRequired,
};
export default RadioButton;
