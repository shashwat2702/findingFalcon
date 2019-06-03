import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = ({ vehicles }) => (
  <div>
    {
          vehicles.map(vehicle => (
            <div key={vehicle.name}>
              <input type="radio" name="gender" value={vehicle.name} />
              {vehicle.name}
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
