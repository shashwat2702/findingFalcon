import React from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss';

const RadioButton = ({ vehicles, onRadioClick, planetNumber }) => (
  <div>
    {
          vehicles.map(vehicle => (
            <div key={vehicle.name} className="dropdown">
              <input type="radio" name={`vehicle${planetNumber}`} value={vehicle.name} disabled={false} onClick={onRadioClick} />
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
  // eslint-disable-next-line react/forbid-prop-types
  vehicles: PropTypes.array.isRequired,
  onRadioClick: PropTypes.func.isRequired,
  planetNumber: PropTypes.number.isRequired,
};
export default RadioButton;
