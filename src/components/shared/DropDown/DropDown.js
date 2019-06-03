/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './DropDown.scss';

const DropDown = ({
  planets, onChange, name, selectedPlanets,
}) => (
  <div className="dropDown">
    <select value={selectedPlanets[Number(name) - 1]} onChange={onChange} name={name}>
      <option value="Select One">Select One</option>
      {(selectedPlanets[Number(name) - 1] !== '')
      && (
      <option
        value={selectedPlanets[Number(name) - 1]}
        key={selectedPlanets[Number(name) - 1]}
      >
        {selectedPlanets[Number(name) - 1]}

      </option>
      )
      }
      {
          planets.map(planet => (!selectedPlanets.includes(planet.name)
            && <option value={planet.name} key={planet.name}>{planet.name}</option>
          ))
      }
    </select>
  </div>
);
DropDown.propTypes = {
  planets: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.number.isRequired,
  selectedPlanets: PropTypes.array.isRequired,
};
export default DropDown;
