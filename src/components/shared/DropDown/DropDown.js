/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './DropDown.scss';

const DropDown = ({ planets }) => (
  <div className="dropDown">
    <select defaultValue="Select One">
      <option value="Select One">Select One</option>
      {
          planets.map(planet => (
            <option value={planet.name} key={planet.name}>{planet.name}</option>
          ))
      }
    </select>
  </div>
);
DropDown.propTypes = {
  planets: PropTypes.array.isRequired,
};
export default DropDown;
