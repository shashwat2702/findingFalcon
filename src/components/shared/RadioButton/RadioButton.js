import React from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss';

const RadioButton = ({ vehicles }) => (
  <div>
    {
          vehicles.map(vehicle => (
            <div key={vehicle.name} className="dropdown">
              <input type="radio" name="gender" value={vehicle.name} disabled={false} />
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
};
export default RadioButton;
