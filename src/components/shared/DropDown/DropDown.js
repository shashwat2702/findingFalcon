/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './DropDown.scss';

const DropDown = ({ planets, onChange }) => (
  <div className="dropDown">
    <select defaultValue="Select One" onChange={onChange}>
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
  onChange: PropTypes.func.isRequired,
};
export default DropDown;
