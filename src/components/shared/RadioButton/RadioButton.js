/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss';

const isDisabled = (selectedPlanets, planetNumber, vehicle, planets) => {
  const selectedPlanet = selectedPlanets[Number(planetNumber) - 1];
  const indexOfPlanet = planets.findIndex((planet) => {
    if (planet.name === selectedPlanet) {
      return true;
    }
    return false;
  });
  const planetDetails = planets[indexOfPlanet];
  const { distance } = planetDetails;
  if (vehicle.max_distance < distance) {
    return true;
  }
  return false;
};

const RadioButton = ({
  vehicles, onRadioClick, planetNumber, selectedPlanets, planets,
}) => (
  <div>
    {
          vehicles.map(vehicle => (
            <div key={vehicle.name} className="dropdown">
              <input
                type="radio"
                name={`vehicle${planetNumber}`}
                value={vehicle.name}
                disabled={isDisabled(selectedPlanets, planetNumber, vehicle, planets)}
                onClick={onRadioClick}
              />
              {' '}
              {vehicle.name}
              {` (${vehicle.total_no})`}
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
};
export default RadioButton;
